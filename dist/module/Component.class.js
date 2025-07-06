import React from 'react';
import { QrcodeCanvas } from 'react-qrcode-pretty';
export default class Component extends React.Component {
    render() {
        return React.createElement(QrcodeCanvas, Object.assign(Object.assign({}, this.props.settings), { value: this.props.payload }));
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
