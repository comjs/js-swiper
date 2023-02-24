"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
var useEffectOnce = function (cb, deps) {
    console.log(process.env.NODE_ENV);
    var ref = react_1.default.useRef(!isDev);
    react_1.default.useEffect(function () {
        console.log(ref.current);
        if (!ref.current) {
            ref.current = true;
            return undefined;
        }
        return cb();
    }, deps);
};
exports.default = useEffectOnce;
