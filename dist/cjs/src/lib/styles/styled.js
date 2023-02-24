"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.ImageWrapperA = exports.ImageWrapperDiv = exports.ImagesWrapper = exports.TimerBar = exports.Container = void 0;
var styled_1 = __importDefault(require("@emotion/styled"));
exports.Container = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  user-select: none;\n  -webkit-touch-callout: none;\n"], ["\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  user-select: none;\n  -webkit-touch-callout: none;\n"])));
exports.TimerBar = styled_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  flex: 0 0 4px;\n  width: 100%;\n  height: 4px;\n  background-color: rgba(0, 0, 0, 0.2);\n  z-index: 2;\n"], ["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  flex: 0 0 4px;\n  width: 100%;\n  height: 4px;\n  background-color: rgba(0, 0, 0, 0.2);\n  z-index: 2;\n"])));
exports.ImagesWrapper = styled_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex: 0 0 100%;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  width: 100%;\n  height: 100%;\n"], ["\n  flex: 0 0 100%;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  width: 100%;\n  height: 100%;\n"])));
exports.ImageWrapperDiv = styled_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n"], ["\n  display: flex;\n  width: 100%;\n  height: 100%;\n"])));
exports.ImageWrapperA = styled_1.default.a(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n"], ["\n  display: flex;\n  width: 100%;\n  height: 100%;\n"])));
exports.Image = styled_1.default.img(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n"], ["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
