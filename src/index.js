import PIXclass from './PIX.class.js';
import PixQrcode from './PixQrcode.class.js';

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
export const PIX = PixQrcode;
export default PixQrcode;
