import { QRCode } from "qrcode.react";


export function payload(

    key           : string,
    merchant      : string,
    city          : string,
    cep          ?: string,
    code         ?: string,
    amount       ?: number|null,
    ignoreErrors ?: boolean   
    
) : string;


export function PIX(props: {

    pixkey        : string,
    merchant      : string,
    city          : string,
    cep          ?: string,
    code         ?: string,
    amount       ?: number|null,
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
        height    : number,
        width     : number,
        x        ?: number,
        y        ?: number,
        excavate ?: boolean

    }

}) : QRCode


export default PIX;
