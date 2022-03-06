import {
    CRC16_POLYNOMIAL1,
    CRC16_POLYNOMIAL2,
    CRC16_POLYNOMIAL3,
    CRC16_POLYNOMIAL4,
    CRC16_DEFAULT_LENGTH
} from './constants.js';


/**
 * Funcoes de suporte
 * 
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */


/**
 * Altera ou remove caracteres acentuados e especiais 
 *
 * @param string string
 * @param string filter
 * @return string
 */
export function removeAccent(subject, filter = /[^\w\s]/gim) {
    return subject.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(filter, '');
}


/**
 * Quantidade de caracteres em uma informacao, retornando sempre 2 caracteres
 *
 * @param string subject
 * @return string
 */
export function padlen(subject) {
    return subject.toString().length.toString().padStart(2, '0');
}


/**
 * Calcula o Checksum CRC16
 *
 * @param string subject
 * @return string
 */
export function CRC16(subject = '') {
    
    let result = CRC16_POLYNOMIAL2;
    const length = subject.length;

    // Checksum
    if(length > 0) {
        for(let offset = 0; offset < length; offset++) {
            result ^= subject.charCodeAt(offset) << 8;
            for(let bitwise = 0; bitwise < 8; bitwise++) {
                if((result <<= 1) & CRC16_POLYNOMIAL3) result ^= CRC16_POLYNOMIAL1;
                result &= CRC16_POLYNOMIAL4;
            }
        }
    }

    return result.toString(16).padStart(parseInt(CRC16_DEFAULT_LENGTH), '0').toUpperCase();

}
