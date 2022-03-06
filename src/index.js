import QRCode from 'qrcode.react';
import PIXclass from './PIX.class.js';


export function pixPayload(key = '', merchant = '', city = '', cep = '', code = '***', amount = null) {

    const pix = new PIXclass(key, merchant, city, cep, code, amount);
    return pix.payload();

}


export function PIX({ key = '', merchant = '', city = '', cep = '', code = '***', amount = null, ...props }) {

    const pix = pixPayload(key, merchant, city, cep, code, amount);

    return QRCode({
        ...props,
        value: pix
    });

}


export default PIX;
