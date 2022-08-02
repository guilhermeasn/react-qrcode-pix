"use strict";
exports.__esModule = true;
var PIX = (function () {
    function PIX(_a) {
        var pixkey = _a.pixkey, merchant = _a.merchant, city = _a.city, cep = _a.cep, code = _a.code, amount = _a.amount, _b = _a.ignoreErrors, ignoreErrors = _b === void 0 ? false : _b;
        if (!ignoreErrors) {
            if (!pixkey || !merchant || !city)
                throw new Error('As propriedades: pixkey (chave pix), merchant (nome do recebedor) e city (cidade do recebedor), são obigatórios!');
            if (!PIX.verifyPixKey(pixkey))
                throw new Error("A chave PIX (pixkey) '".concat(pixkey, "' parece ser inv\u00E1lida! Exemplos de formatos v\u00E1lidos: EMAIL: fulano_da_silva.recebedor@example.com | CPF: 12345678900 | CNPJ: 00038166000105 | TELEFONE: +5561912345678 | ALEATORIA: 123e4567-e12b-12d1-a456-426655440000"));
            if (typeof amount === 'number' && amount <= 0)
                throw new Error('A propriedade amount deve receber um valor numérico maior que zero ou nulo!');
        }
        this._props = {
            pixkey: pixkey.replace(/\s/gim, '').substring(0, 77),
            merchant: PIX.removeAccent(merchant, /[^a-z\s]/gim).substring(0, 80),
            city: PIX.removeAccent(city, /[^a-z\s]/gim).substring(0, 80),
            cep: cep ? cep.replace(/[^0-9]/gim, '').substring(0, 8) : null,
            code: PIX.removeAccent(code || '', /[^a-z0-9]/gim).substring(0, 25).toUpperCase() || '***',
            amount: amount && amount > 0 ? amount : null,
            ignoreErrors: ignoreErrors
        };
    }
    PIX.padder = function (subject, lenght) {
        if (lenght === void 0) { lenght = 2; }
        var target = subject.toString();
        var complement = '';
        if (target.length > lenght) {
            throw new Error("O comprimento de '".concat(subject, "' \u00E9 maior que ").concat(lenght));
        }
        for (var c = 0; c < lenght; c++) {
            complement += '0';
        }
        return (complement + target).slice(target.length);
    };
    PIX.EVM = function (ID, content) {
        if (ID > 99)
            throw new Error('O ID do EVM pode ter no máximo duas casas decimais!');
        if (content.length > 99)
            throw new Error('O conteúdo do EVM pode ter no máximo noventa e nove caracters e espacos!');
        return PIX.padder(ID) + PIX.padder(content.length) + content;
    };
    PIX.removeAccent = function (subject, extra_filter) {
        if (extra_filter === void 0) { extra_filter = /[^\w\s]/gim; }
        return subject.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(extra_filter, '');
    };
    PIX.CRC16 = function (subject) {
        var result = 0xFFFF;
        if (subject.length > 0) {
            for (var offset = 0; offset < subject.length; offset++) {
                result ^= subject.charCodeAt(offset) << 8;
                for (var bitwise = 0; bitwise < 8; bitwise++) {
                    if ((result <<= 1) & 0x10000)
                        result ^= 0x1021;
                    result &= 0xFFFF;
                }
            }
        }
        return result.toString(16).toUpperCase();
    };
    PIX.verifyPixKey = function (pixkey) {
        return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/is.test(pixkey) ||
            /^[0-9]{11}$/is.test(pixkey) ||
            /^[0-9]{14}$/is.test(pixkey) ||
            /^\+[0-9]{12,13}$/is.test(pixkey) ||
            /^[\w-]{32,36}$/is.test(pixkey));
    };
    PIX.prototype.get = function (prop) {
        return this._props[prop];
    };
    PIX.prototype.getPayloadFormat = function () {
        return PIX.EVM(0, PIX.constants.PAYLOAD_FORMAT);
    };
    PIX.prototype.getMerchantAccount = function () {
        var gui = PIX.EVM(0, PIX.constants.MERCHANT_ACCOUNT_GUI);
        var key = PIX.EVM(1, this._props.pixkey);
        return PIX.EVM(26, gui + key);
    };
    PIX.prototype.getMerchantCategory = function () {
        return PIX.EVM(52, PIX.constants.MERCHANT_CATEGORY_CODE);
    };
    PIX.prototype.getTransactionCurrency = function () {
        return PIX.EVM(53, PIX.constants.TRANSACTION_CURRENCY);
    };
    PIX.prototype.getTransactionAmount = function () {
        return this._props.amount ? PIX.EVM(54, this._props.amount.toFixed(2)) : '';
    };
    PIX.prototype.getCountryCode = function () {
        return PIX.EVM(58, PIX.constants.COUNTRY_CODE);
    };
    PIX.prototype.getMerchantName = function () {
        return PIX.EVM(59, this._props.merchant);
    };
    PIX.prototype.getMerchantCity = function () {
        return PIX.EVM(60, this._props.city);
    };
    PIX.prototype.getMerchantCep = function () {
        return this._props.cep && /^[0-9]{8}$/.test(this._props.cep)
            ? PIX.EVM(61, this._props.cep)
            : '';
    };
    PIX.prototype.getAdditionalData = function () {
        var label = PIX.EVM(5, this._props.code);
        return PIX.EVM(62, label);
    };
    PIX.prototype.getInitCRC16 = function () {
        return '63' + PIX.padder(PIX.constants.CRC16_LENGTH);
    };
    PIX.prototype.payload = function () {
        var payload = [
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
        return payload + PIX.padder(PIX.CRC16(payload), PIX.constants.CRC16_LENGTH);
    };
    PIX.prototype.toString = function () {
        return this.payload();
    };
    PIX.constants = {
        PAYLOAD_FORMAT: '01',
        MERCHANT_ACCOUNT_GUI: 'BR.GOV.BCB.PIX',
        MERCHANT_CATEGORY_CODE: '0000',
        TRANSACTION_CURRENCY: '986',
        COUNTRY_CODE: 'BR',
        CRC16_LENGTH: 4
    };
    return PIX;
}());
exports["default"] = PIX;
