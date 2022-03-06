import * as config from './constants.js';

import {
    verifyPixKey,
    removeAccent,
    padlen,
    CRC16
} from './support.js'


/**
 * Classe para gerar o payload do qrcode estatico do PIX
 * 
 * @see https://www.bcb.gov.br/content/estabilidadefinanceira/spb_docs/ManualBRCode.pdf
 * @see https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf
 * 
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */
class PIX {

     /**
     * Carrega os dados do PIX
     *
     * @param string pixkey
     * @param string merchant
     * @param string city
     * @param string cep
     * @param string code
     * @param float amount
     */
    constructor(pixkey = '', merchant = '', city = '', cep = '', code = '***', amount = null) {

        // Verifica os parametros obrigatorios
        if(!pixkey || !merchant || !city) throw new Error('Os parametros: pixkey (chave pix), merchant (nome do recebedor) e city (cidade do recebedor), são obigatórios!');

        // Verifica se a chave parece valida
        if(!verifyPixKey(pixkey)) console.error(`CUIDADO: A chave PIX (pixkey) '${pixkey}' parece ser inválida! Exemplos de formatos válidos: EMAIL: fulano_da_silva.recebedor@example.com | CPF: 12345678900 | CNPJ: 00038166000105 | TELEFONE: +5561912345678 | ALEATORIA: 123e4567-e12b-12d1-a456-426655440000`);
        
        /**
         * Chave PIX
         * 
         * *** Formatos validos ***
         * EMAIL: fulano_da_silva.recebedor@example.com
         * CPF: 12345678900
         * CNPJ: 00038166000105
         * TELEFONE: +5561912345678
         * ALEATORIA: 123e4567-e12b-12d1-a456-426655440000
         * 
         * @var string
         */
        this.pixkey = pixkey.replace(/\s/gim, '').substring(0, 77);

        /**
         * Nome de quem recebe o PIX
         *
         * @var string
         */
        this.merchant = removeAccent(merchant, /[^a-z ]/gim).substring(0, 80);

        /**
         * Cidade de quem recebe o PIX
         *
         * @var string
         */
        this.city = removeAccent(city, /[^a-z ]/gim).substring(0, 80);

        /**
         * CEP de quem recebe o PIX
         * (optional)
         *
         * @var string
         */
        this.cep = cep.replace(/[^0-9]/gim, '').substring(0, 8);

        /**
         * Codigo para identificacao posterior do PIX
         *
         * @var string
         */
        this.code = removeAccent(code, /[^a-z0-9*]/gim).substring(0, 25).toUpperCase();

        /**
         * Valor do PIX
         * (opcional)
         *
         * @var string
         */
        this.amount = (amount === null) ? null : parseFloat(amount).toFixed(2);

    }

    /**
     * Payload Format Indicator
     * ID 00
     *
     * @return string
     */
    getPayloadFormat() {
        return '00' + padlen(config.PAYLOAD_FORMAT) + config.PAYLOAD_FORMAT;
    }

    /**
     * Merchant Account Information
     * ID 26
     * > GUI (ID 00)
     * > KEY (ID 01)
     *
     * @return string
     */
    getMerchantAccount() {

        let gui = '00' + padlen(config.MERCHANT_ACCOUNT_GUI) + config.MERCHANT_ACCOUNT_GUI;
        let key = '01' + padlen(this.pixkey) + this.pixkey;

        return '26' + padlen(gui + key) + gui + key;

    }

    /**
     * Merchant Category Code
     * ID 52
     *
     * @return string
     */
    getMerchantCategory() {
        return '52' + padlen(config.MERCHANT_CATEGORY_CODE) + config.MERCHANT_CATEGORY_CODE;
    }

    /**
     * Transaction Currency
     * ID 53
     *
     * @return string
     */
    getTransactionCurrency() {
        return '53' + padlen(config.TRANSACTION_CURRENCY) + config.TRANSACTION_CURRENCY;
    }

    /**
     * Transaction Amount (optional)
     * ID 54
     *
     * @return string
     */
    getTransactionAmount() {
        return (this.amount === null) ? '' : '54' + padlen(this.amount) + this.amount;
    }

    /**
     * Country Code
     * ID 58
     *
     * @return string
     */
    getCountryCode() {
        return '58' + padlen(config.COUNTRY_CODE) + config.COUNTRY_CODE;
    }

    /**
     * Merchant Name
     * ID 59
     *
     * @return string
     */
    getMerchantName() {
        return '59' + padlen(this.merchant) + this.merchant;
    }

    /**
     * Merchant City
     * ID 60
     *
     * @return string
     */
    getMerchantCity() {
        return '60' + padlen(this.city) + this.city;
    }

    /**
     * Merchant CEP (optional)
     * ID 61
     *
     * @return string
     */
    getMerchantCep() {
        return /^[0-9]{8}$/gim.test(this.cep) ? '61' + padlen(this.cep) + this.cep : '';
    }

    /**
     * Additional Data Field Template
     * ID 62
     * > Reference Label (ID 05)
     *
     * @return string
     */
    getAdditionalData() {
        let label = '05' + padlen(this.code) + this.code;
        return '62' + padlen(label) + label;
    }

    /**
     * CRC16
     * ID 63
     *
     * @return string
     */
    getInitCRC16() {
        return '63' + config.CRC16_DEFAULT_LENGTH;
    }

    /**
     * Gera o payload que pode ser usado para gerar o qrcode
     *
     * @return string
     */
    payload() {

        const payload = this.getPayloadFormat()
                      + this.getMerchantAccount()
                      + this.getMerchantCategory()
                      + this.getTransactionCurrency()
                      + this.getTransactionAmount()
                      + this.getCountryCode()
                      + this.getMerchantName()
                      + this.getMerchantCity()
                      + this.getMerchantCep()
                      + this.getAdditionalData()
                      + this.getInitCRC16();

        return payload + CRC16(payload);

    }

    /**
     * Exibe o payload
     *
     * @return string
     */
    toString() {
        return this.payload();
    }

}


export default PIX;
