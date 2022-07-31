import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import type { IProps } from 'react-qrcode-logo';

export type ComponentProps = {
    settings : IProps,
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

        return React.createElement(QRCode, {
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