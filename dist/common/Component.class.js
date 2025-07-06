"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_qrcode_pretty_1 = require("react-qrcode-pretty");
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.render = function () {
        return react_1.default.createElement(react_qrcode_pretty_1.QrcodeCanvas, __assign(__assign({}, this.props.settings), { value: this.props.payload }));
    };
    Component.prototype.componentDidMount = function () {
        if (typeof this.props.onLoad === 'function') {
            this.props.onLoad(this.props.payload || '');
        }
    };
    Component.prototype.componentDidUpdate = function () {
        if (typeof this.props.onLoad === 'function') {
            this.props.onLoad(this.props.payload || '');
        }
    };
    Component.prototype.componentWillUnmount = function () {
        if (typeof this.props.onLoad === 'function') {
            this.props.onLoad('');
        }
    };
    return Component;
}(react_1.default.Component));
exports.default = Component;
