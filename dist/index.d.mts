import React from 'react';
import { QrcodeProps } from 'react-qrcode-pretty';
export * from 'react-qrcode-pretty';

type PIXProps = {
    pixkey: string;
    merchant: string;
    city: string;
    cep?: string | null;
    code?: string;
    amount?: number | null;
    ignoreErrors?: boolean;
};

declare function payload(props: PIXProps): string;
type PixCanvasComponentProps = PIXProps & Omit<QrcodeProps<'canvas'>, 'value'> & {
    onLoad?: (payload: string) => void;
    children?: React.ReactNode;
};
type PixSVGComponentProps = PIXProps & Omit<QrcodeProps<'SVG'>, 'value'> & {
    onLoad?: (payload: string) => void;
    children?: React.ReactNode;
};
declare function PixCanvas({ pixkey, merchant, city, cep, code, amount, ignoreErrors, onLoad, ...settings }: PixCanvasComponentProps): JSX.Element;
declare function PixSVG({ pixkey, merchant, city, cep, code, amount, ignoreErrors, onLoad, ...settings }: PixSVGComponentProps): JSX.Element;

export { PixCanvas, type PixCanvasComponentProps, PixSVG, type PixSVGComponentProps, PixCanvas as default, payload };
