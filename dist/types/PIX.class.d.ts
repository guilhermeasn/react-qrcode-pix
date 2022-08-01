export declare type PIXProps = {
    pixkey: string;
    merchant: string;
    city: string;
    cep?: string | null;
    code?: string;
    amount?: number | null;
    ignoreErrors?: boolean;
};
export default class PIX {
    static readonly constants: {
        PAYLOAD_FORMAT: string;
        MERCHANT_ACCOUNT_GUI: string;
        MERCHANT_CATEGORY_CODE: string;
        TRANSACTION_CURRENCY: string;
        COUNTRY_CODE: string;
        CRC16_LENGTH: string;
    };
    static EVM(ID: number, content: string): string;
    static removeAccent(subject: string, extra_filter?: RegExp | string): string;
    static CRC16(subject: string, length: number): string;
    static verifyPixKey(pixkey: string): boolean;
    private _props;
    constructor({ pixkey, merchant, city, cep, code, amount, ignoreErrors }: PIXProps);
    get(prop: keyof PIXProps): PIXProps[typeof prop];
    getPayloadFormat(): string;
    getMerchantAccount(): string;
    getMerchantCategory(): string;
    getTransactionCurrency(): string;
    getTransactionAmount(): string;
    getCountryCode(): string;
    getMerchantName(): string;
    getMerchantCity(): string;
    getMerchantCep(): string;
    getAdditionalData(): string;
    getInitCRC16(): string;
    payload(): string;
    toString(): string;
}
