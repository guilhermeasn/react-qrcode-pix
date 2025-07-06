// src/index.ts
import React2 from "react";

// src/Component.class.ts
import React from "react";
import { QrcodeCanvas, QrcodeSVG } from "react-qrcode-pretty";
var Component = class extends React.Component {
  render() {
    return React.createElement(this.props.qrcodeType === "canvas" ? QrcodeCanvas : QrcodeSVG, {
      ...this.props.settings,
      value: this.props.payload
    });
  }
  componentDidMount() {
    if (typeof this.props.onLoad === "function") {
      this.props.onLoad(this.props.payload || "");
    }
  }
  componentDidUpdate() {
    if (typeof this.props.onLoad === "function") {
      this.props.onLoad(this.props.payload || "");
    }
  }
  componentWillUnmount() {
    if (typeof this.props.onLoad === "function") {
      this.props.onLoad("");
    }
  }
};

// src/PIX.class.ts
var _PIX = class _PIX {
  /*
   *  Adiciona zeros a esquerda quando necessario para manter derterminado comprimento
   */
  static padder(subject, lenght = 2) {
    const target = subject.toString();
    let complement = "";
    if (target.length > lenght) {
      throw new Error(`O comprimento de '${subject}' \xE9 maior que ${lenght}`);
    }
    for (let c = 0; c < lenght; c++) {
      complement += "0";
    }
    return (complement + target).slice(target.length);
  }
  /**
   * Padronizacao EVM Brasil QrCode
   */
  static EVM(ID, content) {
    if (ID > 99) throw new Error("O ID do EVM pode ter no m\xE1ximo duas casas decimais!");
    if (content.length > 99) throw new Error("O conte\xFAdo do EVM pode ter no m\xE1ximo noventa e nove caracters e espacos!");
    return _PIX.padder(ID) + _PIX.padder(content.length) + content;
  }
  /**
   * Altera ou remove caracteres acentuados e especiais 
   */
  static removeAccent(subject, extra_filter = /[^\w\s]/gim) {
    return !!String.prototype.normalize ? subject.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(extra_filter, "") : subject.replace(extra_filter, "");
  }
  /**
   * Calcula o Checksum CRC16
   */
  static CRC16(subject) {
    let result = 65535;
    if (subject.length > 0) {
      for (let offset = 0; offset < subject.length; offset++) {
        result ^= subject.charCodeAt(offset) << 8;
        for (let bitwise = 0; bitwise < 8; bitwise++) {
          if ((result <<= 1) & 65536) result ^= 4129;
          result &= 65535;
        }
      }
    }
    return result.toString(16).toUpperCase();
  }
  /**
   * Verifica se o formato da chave pix parece valido
   */
  static verifyPixKey(pixkey) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(pixkey) || // Chave do tipo email
    /^[0-9]{11}$/i.test(pixkey) || // Chave do tipo CPF
    /^[0-9]{14}$/i.test(pixkey) || // Chave do tipo CNPJ
    /^\+[0-9]{12,13}$/i.test(pixkey) || // Chave do tipo telefone
    /^[\w-]{32,36}$/i.test(pixkey);
  }
  /* METODOS DA INSTANCIA */
  /**
   * Carrega os dados do PIX
   */
  constructor({ pixkey, merchant, city, cep, code, amount, ignoreErrors = false }) {
    if (!ignoreErrors) {
      if (!pixkey || !merchant || !city) throw new Error("As propriedades: pixkey (chave pix), merchant (nome do recebedor) e city (cidade do recebedor), s\xE3o obigat\xF3rios!");
      if (!_PIX.verifyPixKey(pixkey)) throw new Error(`A chave PIX (pixkey) '${pixkey}' parece ser inv\xE1lida! Exemplos de formatos v\xE1lidos: EMAIL: fulano_da_silva.recebedor@example.com | CPF: 12345678900 | CNPJ: 00038166000105 | TELEFONE: +5561912345678 | ALEATORIA: 123e4567-e12b-12d1-a456-426655440000`);
      if (typeof amount === "number" && amount <= 0) throw new Error("A propriedade amount deve receber um valor num\xE9rico maior que zero ou nulo!");
    }
    this._props = {
      pixkey: pixkey.replace(/\s/gim, "").substring(0, 77),
      merchant: _PIX.removeAccent(merchant, /[^a-z\s]/gim).substring(0, 80),
      city: _PIX.removeAccent(city, /[^a-z\s]/gim).substring(0, 80),
      cep: cep ? cep.replace(/[^0-9]/gim, "").substring(0, 8) : null,
      code: _PIX.removeAccent(code || "", /[^a-z0-9]/gim).substring(0, 25).toUpperCase() || "***",
      amount: amount && amount > 0 ? amount : null,
      ignoreErrors
    };
  }
  /*
   * Recupera uma propriedade da instancia
   */
  get(prop) {
    return this._props[prop];
  }
  /**
   * Payload Format Indicator - ID 0
   */
  getPayloadFormat() {
    return _PIX.EVM(0, _PIX.constants.PAYLOAD_FORMAT);
  }
  /**
   * Merchant Account Information - ID 26
   * > GUI - SubID 0
   * > KEY - SubID 1
   */
  getMerchantAccount() {
    const gui = _PIX.EVM(0, _PIX.constants.MERCHANT_ACCOUNT_GUI);
    const key = _PIX.EVM(1, this._props.pixkey);
    return _PIX.EVM(26, gui + key);
  }
  /**
   * Merchant Category Code - ID 52
   */
  getMerchantCategory() {
    return _PIX.EVM(52, _PIX.constants.MERCHANT_CATEGORY_CODE);
  }
  /**
   * Transaction Currency - ID 53
   */
  getTransactionCurrency() {
    return _PIX.EVM(53, _PIX.constants.TRANSACTION_CURRENCY);
  }
  /**
   * Transaction Amount (optional) - ID 54
   */
  getTransactionAmount() {
    return this._props.amount ? _PIX.EVM(54, this._props.amount.toFixed(2)) : "";
  }
  /**
   * Country Code - ID 58
   */
  getCountryCode() {
    return _PIX.EVM(58, _PIX.constants.COUNTRY_CODE);
  }
  /**
   * Merchant Name - ID 59
   */
  getMerchantName() {
    return _PIX.EVM(59, this._props.merchant);
  }
  /**
   * Merchant City - ID 60
   */
  getMerchantCity() {
    return _PIX.EVM(60, this._props.city);
  }
  /**
   * Merchant CEP (optional) - ID 61
   */
  getMerchantCep() {
    return this._props.cep && /^[0-9]{8}$/.test(this._props.cep) ? _PIX.EVM(61, this._props.cep) : "";
  }
  /**
   * Additional Data Field Template - ID 62
   * > Reference Label - SubID 5
   */
  getAdditionalData() {
    const label = _PIX.EVM(5, this._props.code);
    return _PIX.EVM(62, label);
  }
  /**
   * Init CRC16 - ID 63
   */
  getInitCRC16() {
    return "63" + _PIX.padder(_PIX.constants.CRC16_LENGTH);
  }
  /**
   * Gera o payload que pode ser usado para fazer o qrcode
   */
  payload() {
    const payload2 = [
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
    ].join("");
    return payload2 + _PIX.padder(_PIX.CRC16(payload2), _PIX.constants.CRC16_LENGTH);
  }
  /**
   * Exibe o payload
   */
  toString() {
    return this.payload();
  }
};
/* ATRIBUTOS E METODOS ESTATICOS */
/**
 * Constantes de configuracao padrao
 */
_PIX.constants = {
  PAYLOAD_FORMAT: "01",
  MERCHANT_ACCOUNT_GUI: "BR.GOV.BCB.PIX",
  MERCHANT_CATEGORY_CODE: "0000",
  TRANSACTION_CURRENCY: "986",
  COUNTRY_CODE: "BR",
  CRC16_LENGTH: 4
};
var PIX = _PIX;

// src/index.ts
export * from "react-qrcode-pretty";
function payload(props) {
  const pix = new PIX(props);
  return pix.payload();
}
function PixCanvas({
  pixkey,
  merchant,
  city,
  cep,
  code,
  amount,
  ignoreErrors = false,
  onLoad = (_) => {
  },
  ...settings
}) {
  if (typeof settings.size === "undefined") {
    settings.size = 256;
  }
  try {
    return React2.createElement(Component, {
      payload: payload({ pixkey, merchant, city, cep, code, amount, ignoreErrors }),
      qrcodeType: "canvas",
      settings,
      onLoad
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "test") console.error(error);
    return React2.createElement("div", {
      style: {
        width: settings == null ? void 0 : settings.size,
        height: settings == null ? void 0 : settings.size,
        margin: "10px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e5d5d5",
        border: "solid 1px",
        borderRadius: "10px",
        borderColor: "#440000",
        textAlign: "center",
        color: "#770000",
        fontSize: "18px",
        opacity: "0.75"
      }
    }, "PIX n\xE3o pode ser carregado!");
  }
}
function PixSVG({
  pixkey,
  merchant,
  city,
  cep,
  code,
  amount,
  ignoreErrors = false,
  onLoad = (_) => {
  },
  ...settings
}) {
  if (typeof settings.size === "undefined") {
    settings.size = 256;
  }
  try {
    return React2.createElement(Component, {
      payload: payload({ pixkey, merchant, city, cep, code, amount, ignoreErrors }),
      qrcodeType: "SVG",
      settings,
      onLoad
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "test") console.error(error);
    return React2.createElement("div", {
      style: {
        width: settings == null ? void 0 : settings.size,
        height: settings == null ? void 0 : settings.size,
        margin: "10px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e5d5d5",
        border: "solid 1px",
        borderRadius: "10px",
        borderColor: "#440000",
        textAlign: "center",
        color: "#770000",
        fontSize: "18px",
        opacity: "0.75"
      }
    }, "PIX n\xE3o pode ser carregado!");
  }
}
var index_default = PixCanvas;
export {
  PixCanvas,
  PixSVG,
  index_default as default,
  payload
};
//# sourceMappingURL=index.mjs.map