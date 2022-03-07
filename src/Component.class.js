import React from 'react';
import QRCode from 'qrcode.react';


export default class Component extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            renderAs: 'svg',
            level: 'M',
            size: 256,
            ...props.config,
            value: props.payload || ''
        }

    }

    componentDidMount() {
        if(typeof this.props.onLoad === 'function') {
            this.props.onLoad(this.state.value);
        }
    }

    render() {
        return React.createElement(QRCode, this.state);
    }

}
