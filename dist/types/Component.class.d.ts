import React from 'react';
import type { QrcodeProps } from 'react-qrcode-pretty';
export declare type ComponentProps = {
    settings: Omit<QrcodeProps<'canvas'>, 'value'>;
    payload: string;
    onLoad: (payload: string) => void;
};
export default class Component extends React.Component<ComponentProps> {
    render(): React.FunctionComponentElement<QrcodeProps<"canvas">>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
}
