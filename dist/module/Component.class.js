import React from 'react';
import { QRCode } from 'react-qrcode-logo';
export default class Component extends React.Component {
    render() {
        return React.createElement(QRCode, Object.assign(Object.assign({}, this.props.settings), { value: this.props.payload }));
    }
    componentDidMount() {
        if (typeof this.props.onLoad === 'function') {
            this.props.onLoad(this.props.payload || '');
        }
    }
    componentDidUpdate() {
        if (typeof this.props.onLoad === 'function') {
            this.props.onLoad(this.props.payload || '');
        }
    }
    componentWillUnmount() {
        if (typeof this.props.onLoad === 'function') {
            this.props.onLoad('');
        }
    }
}
