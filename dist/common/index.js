"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.PIX = exports.payload = void 0;
var react_1 = __importDefault(require("react"));
var PIX_class_1 = __importDefault(require("./PIX.class"));
var Component_class_1 = __importDefault(require("./Component.class"));
function payload(props) {
    var pix = new PIX_class_1["default"](props);
    return pix.payload();
}
exports.payload = payload;
function PIX(_a) {
    var _b, _c, _d, _e;
    var pixkey = _a.pixkey, merchant = _a.merchant, city = _a.city, cep = _a.cep, code = _a.code, amount = _a.amount, _f = _a.ignoreErrors, ignoreErrors = _f === void 0 ? false : _f, _g = _a.onLoad, onLoad = _g === void 0 ? function (_) { } : _g, settings = __rest(_a, ["pixkey", "merchant", "city", "cep", "code", "amount", "ignoreErrors", "onLoad"]);
    if (!(settings === null || settings === void 0 ? void 0 : settings.size) && !(settings === null || settings === void 0 ? void 0 : settings.resize)) {
        settings.resize = 256;
    }
    try {
        return react_1["default"].createElement(Component_class_1["default"], {
            payload: payload({ pixkey: pixkey, merchant: merchant, city: city, cep: cep, code: code, amount: amount, ignoreErrors: ignoreErrors }),
            settings: settings,
            onLoad: onLoad
        });
    }
    catch (error) {
        if (process.env.NODE_ENV !== 'test')
            console.error(error);
        return react_1["default"].createElement('div', {
            style: {
                width: (_c = (_b = settings === null || settings === void 0 ? void 0 : settings.size) !== null && _b !== void 0 ? _b : settings === null || settings === void 0 ? void 0 : settings.resize) !== null && _c !== void 0 ? _c : 256,
                height: (_e = (_d = settings === null || settings === void 0 ? void 0 : settings.size) !== null && _d !== void 0 ? _d : settings === null || settings === void 0 ? void 0 : settings.resize) !== null && _e !== void 0 ? _e : 256,
                margin: '10px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e5d5d5',
                border: 'solid 1px',
                borderRadius: '10px',
                borderColor: '#440000',
                textAlign: 'center',
                color: '#770000',
                fontSize: '18px',
                opacity: '0.75'
            }
        }, 'PIX não pode ser carregado!');
    }
}
exports.PIX = PIX;
exports["default"] = PIX;
