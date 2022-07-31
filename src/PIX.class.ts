export type PIXProps = {

    /**
     * Chave PIX
     * 
     * *** Formatos validos ***
     * EMAIL: fulano_da_silva.recebedor@example.com
     * CPF: 12345678900
     * CNPJ: 00038166000105
     * TELEFONE: +5561912345678
     * ALEATORIA: 123e4567-e12b-12d1-a456-426655440000
     */
    pixkey : string;

    /**
     * Nome de quem recebe o PIX
     */
    merchant : string;

    /**
     * Cidade de quem recebe o PIX
     */
    city : string;

    /**
     * CEP de quem recebe o PIX
     * (optional)
     */
    cep ?: string | null;

    /**
     * Codigo para identificacao posterior do PIX
     */
    code ?: string;

    /**
     * Valor do PIX
     * (opcional)
     */
    amount ?: number | null;

    /**
     * Verifica ou nao erros nas informacoes fornecidas
     */
    ignoreErrors ?: boolean;

}

/**
 * Classe para gerar o payload para o qrcode estatico do PIX
 * 
 * @see https://www.bcb.gov.br/content/estabilidadefinanceira/spb_docs/ManualBRCode.pdf
 * @see https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf
 * 
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */
export default class PIX {

    /* ATRIBUTOS E METODOS ESTATICOS */

    /**
     * Constantes de configuracao padrao
     */
    public static readonly constants = {

        PAYLOAD_FORMAT:         '01',
        MERCHANT_ACCOUNT_GUI:   'BR.GOV.BCB.PIX',
        MERCHANT_CATEGORY_CODE: '0000',
        TRANSACTION_CURRENCY:   '986',
        COUNTRY_CODE:           'BR',
        CRC16_LENGTH:           '04'

    }

    /**
     * Padronizacao EVM Brasil QrCode
     */
    public static EVM(ID : number, content : string) : string {

        if(ID > 99) throw new Error('O ID do EVM pode ter no máximo duas casas decimais!');
        if(content.length > 99) throw new Error('O conteúdo do EVM pode ter no máximo noventa e nove caracters e espacos!'); 
        
        return ID.toString().padStart(2, '0') + content.length.toString().padStart(2, '0') + content;

    }

    /**
     * Altera ou remove caracteres acentuados e especiais 
     */
    public static removeAccent(subject : string, extra_filter : RegExp | string = /[^\w\s]/gim) : string {
        return subject.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(extra_filter, '');
    }

    /**
     * Calcula o Checksum CRC16
     */
    public static CRC16(subject : string, length : number) : string {
        
        let result = 0xFFFF;

        if(subject.length > 0) {
            for(let offset = 0; offset < subject.length; offset++) {
                result ^= subject.charCodeAt(offset) << 8;
                for(let bitwise = 0; bitwise < 8; bitwise++) {
                    if((result <<= 1) & 0x10000) result ^= 0x1021;
                    result &= 0xFFFF;
                }
            }
        }

        return result.toString(16).padStart(length, '0').toUpperCase();

    }

    /**
     * Verifica se o formato da chave pix parece valido
     */
    public static verifyPixKey(pixkey : string) : boolean {

        return (
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/is.test(pixkey) ||  // Chave do tipo email
            /^[0-9]{11}$/is.test(pixkey)                ||  // Chave do tipo CPF
            /^[0-9]{14}$/is.test(pixkey)                ||  // Chave do tipo CNPJ
            /^\+[0-9]{12,13}$/is.test(pixkey)           ||  // Chave do tipo telefone
            /^[\w-]{32,36}$/is.test(pixkey)                 // Chave aleatoria
        );
    
    }

    /* ATRIBUTOS DA INSTANCIA */

    private _props : Required<PIXProps>;

    /* METODOS DA INSTANCIA */

    /**
     * Carrega os dados do PIX
     */
    public constructor({ pixkey, merchant, city, cep, code, amount, ignoreErrors = false } : PIXProps) {

        if(!ignoreErrors) {

            // Verifica os parametros obrigatorios
            if(!pixkey || !merchant || !city) throw new Error('As propriedades: pixkey (chave pix), merchant (nome do recebedor) e city (cidade do recebedor), são obigatórios!');

            // Verifica se a chave eh valida
            if(!PIX.verifyPixKey(pixkey)) throw new Error(`A chave PIX (pixkey) '${pixkey}' parece ser inválida! Exemplos de formatos válidos: EMAIL: fulano_da_silva.recebedor@example.com | CPF: 12345678900 | CNPJ: 00038166000105 | TELEFONE: +5561912345678 | ALEATORIA: 123e4567-e12b-12d1-a456-426655440000`);

             // Verifica se amount recebeu um valor valido
             if(typeof amount === 'number' && amount <= 0) throw new Error('A propriedade amount deve receber um valor numérico maior que zero ou nulo!');

        }

        this._props = {

            pixkey:   pixkey.replace(/\s/gim, '').substring(0, 77),
            merchant: PIX.removeAccent(merchant, /[^a-z\s]/gim).substring(0, 80),
            city:     PIX.removeAccent(city, /[^a-z\s]/gim).substring(0, 80),
            cep:      cep ? cep.replace(/[^0-9]/gim, '').substring(0, 8) : null,
            code:     PIX.removeAccent(code || '', /[^a-z0-9]/gim).substring(0, 25).toUpperCase() || '***',
            amount:   amount && amount > 0 ? amount : null,

            ignoreErrors

        };

    }

    public get(prop : keyof PIXProps) : PIXProps[typeof prop] {
        return this._props[prop];
    }

    /**
     * Payload Format Indicator - ID 0
     */
    public getPayloadFormat() : string {
        return PIX.EVM(0, PIX.constants.PAYLOAD_FORMAT);
    }
    
    /**
     * Merchant Account Information - ID 26
     * > GUI - SubID 0
     * > KEY - SubID 1
     */
    public getMerchantAccount() : string {

        const gui = PIX.EVM(0, PIX.constants.MERCHANT_ACCOUNT_GUI);
        const key = PIX.EVM(1, this._props.pixkey);

        return PIX.EVM(26, gui + key);

    }

    /**
     * Merchant Category Code - ID 52
     */
    public getMerchantCategory() : string {
        return PIX.EVM(52, PIX.constants.MERCHANT_CATEGORY_CODE);
    }

    /**
     * Transaction Currency - ID 53
     */
    public getTransactionCurrency() : string {
        return PIX.EVM(53, PIX.constants.TRANSACTION_CURRENCY);
    }

    /**
     * Transaction Amount (optional) - ID 54
     */
    public getTransactionAmount() : string {
        return this._props.amount ? PIX.EVM(54, this._props.amount.toFixed(2)) : '';
    }

    /**
     * Country Code - ID 58
     */
    public getCountryCode() : string {
        return PIX.EVM(58, PIX.constants.COUNTRY_CODE);
    }

    /**
     * Merchant Name - ID 59
     */
    public getMerchantName() : string {
        return PIX.EVM(59, this._props.merchant);
    }

    /**
     * Merchant City - ID 60
     */
    public getMerchantCity() : string {
        return PIX.EVM(60, this._props.city);
    }

    /**
     * Merchant CEP (optional) - ID 61
     */
    public getMerchantCep() : string {
        return this._props.cep && /^[0-9]{8}$/.test(this._props.cep)
            ? PIX.EVM(61, this._props.cep)
            : '';
    }

    /**
     * Additional Data Field Template - ID 62
     * > Reference Label - SubID 5
     */
    public getAdditionalData() : string {
        const label = PIX.EVM(5, this._props.code);
        return PIX.EVM(62, label);
    }

    /**
     * Init CRC16 - ID 63
     */
    public getInitCRC16() : string {
        return '63' + PIX.constants.CRC16_LENGTH;
    }

    /**
     * Gera o payload que pode ser usado para fazer o qrcode
     */
    public payload() : string {

        const payload = [

            this.getPayloadFormat(),
            this.getMerchantAccount(),
            this.getMerchantCategory(),
            this.getTransactionCurrency(),
            this.getTransactionAmount(),
            this.getCountryCode(),
            this.getMerchantName(),
            this.getMerchantCity(),
            this.getMerchantCep(),
            this.getAdditionalData(),
            this.getInitCRC16()
            
        ].join('');

        return payload + PIX.CRC16(payload, parseInt(PIX.constants.CRC16_LENGTH));

    }

    /**
     * Exibe o payload
     */
    public toString() : string {
        return this.payload();
    }

}