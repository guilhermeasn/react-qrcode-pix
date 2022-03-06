import QRCode from 'qrcode.react';
import PIXclass from './PIX.class.js';
import { useEffect } from 'react';

/**
 * REACT-QRCODE-PIX
 * 
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */


/**
 * Gera o payload para o poder usar no qrcode ou no sistema copia e cola do PIX
*/
export function pixPayload(key = '', merchant = '', city = '', cep = '', code = '***', amount = null) {

    const pix = new PIXclass(key, merchant, city, cep, code, amount);
    return pix.payload();

}

/**
 * Qrcode estático do PIX
 */
export function PIX({
    pixkey = '',
    merchant = '',
    city = '',
    cep = '',
    code = '***',
    amount = null,
    onLoad = payload => {},
    ...props
}) {

    const pix = pixPayload(pixkey, merchant, city, cep, code, amount);

    setTimeout(() => onLoad(pix));

    return QRCode({
        renderAs: 'svg',
        size: 256,
        level: 'M',
        ...props,
        value: pix
    });

}


export default PIX;
