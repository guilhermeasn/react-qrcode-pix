import React from "react";
import PIX from './PIX.class.js';

/**
 * React Component
 * 
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */

export class PixQrcode extends React.Component {

    constructor({
        pixkey = '',
        merchant = '',
        city = '',
        cep = '',
        code = '***',
        amount = null,
        onLoad = payload => {},
        ...props
    }) {

        super(props);
        this.state = {
            pix: ''
        }

    }

    componentDidMount() {
        onLoad(this.state.pix);
    }

    render() {

        const pix = new PIX(pixkey, merchant, city, cep, code, amount);
        this.setState('pix', pix.payload);

        return QRCode({
            renderAs: 'svg',
            size: 256,
            level: 'M',
            ...this.props,
            value: this.state.pix
        });
        
    }

}
