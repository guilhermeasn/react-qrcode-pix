import React from 'react';
import QRCode from 'qrcode.react';


/**
 * Component React
 * 
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */


export default class Component extends React.Component {

    render() {

        return React.createElement(QRCode, {
            renderAs: 'svg',
            level: 'M',
            size: 256,
            ...this.props.config,
            value: this.props.payload || ''
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
