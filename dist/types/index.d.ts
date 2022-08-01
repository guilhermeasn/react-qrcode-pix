import React from 'react';
import type { PIXProps } from './PIX.class';
import Component from './Component.class';
import type { IProps } from 'react-qrcode-logo';
export declare function payload(props: PIXProps): string;
export declare function PIX({ pixkey, merchant, city, cep, code, amount, ignoreErrors, onLoad, ...settings }: PIXProps & IProps & {
    onLoad?: (payload: string) => void;
}): React.CElement<import("./Component.class").ComponentProps, Component> | React.DetailedReactHTMLElement<{
    style: {
        width: number;
        height: number;
        margin: string;
        display: "flex";
        justifyContent: "center";
        alignItems: "center";
        backgroundColor: "#e5d5d5";
        border: string;
        borderRadius: string;
        borderColor: "#440000";
        textAlign: "center";
        color: "#770000";
        fontSize: string;
        opacity: "0.75";
    };
}, HTMLElement>;
export default PIX;
