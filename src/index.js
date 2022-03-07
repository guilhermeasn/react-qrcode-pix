import React from 'react';
import PIXpayload from './PIX.class.js';
import PIXcomponent from './PIXcomponent.class.js';


/**
 * REACT-QRCODE-PIX
 * 
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */


/**
 * Gera o payload para poder usar no qrcode ou no sistema copia e cola do PIX
*/
export function pixPayload(pixkey = '', merchant = '', city = '', cep = '', code = '***', amount = null) {

    const pix = new PIXpayload(pixkey, merchant, city, cep, code, amount);
    return pix.payload();

}


/**
 * Qrcode estático do PIX
 */
export const PIX = ({

    pixkey   = '',
    merchant = '',
    city     = '',
    cep      = '',
    code     = '***',
    amount   = null,
    onLoad   = payload => {},
    ...props

}) => React.createElement(PIXcomponent, {

    payload: pixPayload(pixkey, merchant, city, cep, code, amount),
    qrcode: props,
    onLoad

});


export default PIX;
