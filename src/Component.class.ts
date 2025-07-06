import React from 'react';
import type { QrcodeFormat, QrcodeProps } from 'react-qrcode-pretty';
import { QrcodeCanvas, QrcodeSVG } from 'react-qrcode-pretty';

export type ComponentProps<F extends QrcodeFormat> = {
    settings   : Omit<QrcodeProps<F>, 'value'>,
    payload    : string,
    qrcodeType : QrcodeFormat
    onLoad     : (payload : string) => void
}

/**
 * Component React com o QrCode para receber o payload do PIX
 * 
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */
export default class Component<F extends QrcodeFormat> extends React.Component<ComponentProps<F>> {

    render() {

        return React.createElement((
          (this.props.qrcodeType === 'canvas' ? QrcodeCanvas : QrcodeSVG) as any
        ), {
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