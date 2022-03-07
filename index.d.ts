import { QRCode } from "qrcode.react";


export function pixPayload(

    key           : string,
    merchant      : string,
    city          : string,
    cep          ?: string,
    code         ?: string,
    amount       ?: string|null,
    ignoreErrors ?: boolean   
    
) : string;


export function PIX(props: {

    pixkey        : string,
    merchant      : string,
    city          : string,
    cep          ?: string,
    code         ?: string,
    amount       ?: string|null,
    onLoad       ?: (payload : string) => {},
    ignoreErrors ?: boolean,
    
    size          ?: number,
    includeMargin ?: boolean,
    bgColor       ?: string,
    fgColor       ?: string,
    level         ?: 'L'|'M'|'Q'|'H',
    renderAs      ?: 'canvas'|'svg'
    imageSettings ?: {

        src       : string,	
        x        ?: number,
        y        ?: number,
        height   ?: number,
        width    ?: number,
        excavate ?: boolean

    }

}) : QRCode


export default PIX;
