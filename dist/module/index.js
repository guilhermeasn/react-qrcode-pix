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
import React from 'react';
import PixPayload from './PIX.class';
import Component from './Component.class';
export function payload(props) {
    const pix = new PixPayload(props);
    return pix.payload();
}
export function PIX(_a) {
    var { pixkey, merchant, city, cep, code, amount, ignoreErrors = false, onLoad = (_) => { } } = _a, settings = __rest(_a, ["pixkey", "merchant", "city", "cep", "code", "amount", "ignoreErrors", "onLoad"]);
    if (!settings.size)
        settings.size = 256;
    try {
        return React.createElement(Component, {
            payload: payload({ pixkey, merchant, city, cep, code, amount, ignoreErrors }),
            settings,
            onLoad
        });
    }
    catch (error) {
        if (process.env.NODE_ENV !== 'test')
            console.error(error);
        return React.createElement('div', {
            style: {
                width: settings.size,
                height: settings.size,
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
export default PIX;
