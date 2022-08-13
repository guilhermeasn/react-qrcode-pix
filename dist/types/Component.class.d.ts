import React from 'react';
import type { QrCodeProps } from 'react-qrcode-pretty';
export declare type ComponentProps = {
    settings: Omit<QrCodeProps, 'value'>;
    payload: string;
    onLoad: (payload: string) => void;
};
export default class Component extends React.Component<ComponentProps> {
    render(): React.FunctionComponentElement<QrCodeProps>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
}
