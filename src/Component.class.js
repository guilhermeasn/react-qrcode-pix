import React from 'react';
import QRCode from 'qrcode.react';


export default class Component extends React.Component {

    componentDidUpdate() {
        if(typeof this.props.onLoad === 'function') {
            this.props.onLoad(this.props.payload || '');
        }
    }
    

    render() {

        return React.createElement(QRCode, {
            renderAs: 'svg',
            level: 'M',
            size: 256,
            ...this.props.config,
            value: this.props.payload || ''
        });

    }

}
