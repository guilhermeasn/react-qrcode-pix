import React from 'react';
import QRCode from 'qrcode.react';


export default class PIXcomponent extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            renderAs: 'svg',
            size: 256,
            level: 'M',
            value: props.payload || '',
            ...props.qrcode
        }

    }

    componentDidMount() {
        if(typeof this.props.onLoad === 'function') {
            this.props.onLoad(this.state.value);
        }
    }

    render() {
        return QRCode(this.state);
    }

}
