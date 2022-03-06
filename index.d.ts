import { ReactFragment } from "react";

export function pixPayload(key : string, merchant : string, city : string, cep ?: string, code ?: string, amount ?: string|null ) : string;

export function PIX(props: {

    pixkey : string,
    merchant : string,
    city : string,
    cep ?: string,
    code ?: string,
    amount ?: string|null,
    onLoad ?: (payload : string) => {},
    
    size?: number | undefined;
    includeMargin?: boolean | undefined;
    bgColor?: string | undefined;
    fgColor?: string | undefined;
    level?: "L"|"M"|"Q"|"H" | undefined;
    imageSettings?: ImageSettings | undefined;

}) : ReactFragment

export default PIX;
