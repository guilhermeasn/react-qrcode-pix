import React from 'react';
import PixPayload from './PIX.class.js';
import Component from './Component.class.js';


/**
 * REACT-QRCODE-PIX
 * 
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */


/**
 * Gera o payload para poder usar no qrcode ou no sistema copia e cola do PIX
 */
export function payload(pixkey = '', merchant = '', city = '', cep = '', code = '***', amount = null, ignoreErrors = false) {

    const pix = new PixPayload(pixkey, merchant, city, cep, code, amount, ignoreErrors);
    return pix.payload();

}


/**
 * Qrcode estático do PIX
 */
export function PIX({

    pixkey       = '',
    merchant     = '',
    city         = '',
    cep          = '',
    code         = '***',
    amount       = null,
    ignoreErrors = false,
    onLoad       = payload => {},
    ...config

}) {

    try {

        return React.createElement(Component, {
            payload: payload(pixkey, merchant, city, cep, code, amount, ignoreErrors),
            config,
            onLoad
        });

    } catch(error) {

        console.error(error);

        const size = typeof config.size === 'number' ? config.size : 256;

        return React.createElement('div', {
            style: {
                width: size,
                height: size,
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
