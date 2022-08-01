import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import type { IProps } from 'react-qrcode-logo';
export declare type ComponentProps = {
    settings: IProps;
    payload: string;
    onLoad: (payload: string) => void;
};
export default class Component extends React.Component<ComponentProps> {
    render(): React.CElement<IProps, QRCode>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
}
