import React from 'react';
import { QrCode } from 'react-qrcode-pretty';
import type { QrCodeProps } from 'react-qrcode-pretty';

export type ComponentProps = {
    settings : Omit<QrCodeProps, 'value'>,
    payload  : string,
    onLoad   : (payload : string) => void
}

/**
 * Component React com o QrCode para receber o payload do PIX
 * 
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */
export default class Component extends React.Component<ComponentProps> {

    render() {

        return React.createElement(QrCode, {
            ...this.props.settings,
            value: this.props.payload
        });

    }

    componentDidMount() {

        if(typeof this.props.onLoad === 'function') {
            this.props.onLoad(this.props.payload || '');
        }

    }

    componentDidUpdate() {

        if(typeof this.props.onLoad === 'function') {
            this.props.onLoad(this.props.payload || '');
        }

    }

    componentWillUnmount() {

        if(typeof this.props.onLoad === 'function') {
            this.props.onLoad('');
        }
        
    }

}