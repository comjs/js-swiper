"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Styled = __importStar(require("../styles/styled"));
var functions_1 = require("../utils/functions");
var react_1 = require("react");
var usePrevious_1 = __importDefault(require("../utils/usePrevious"));
var useEffectOnce_1 = __importDefault(require("../utils/useEffectOnce"));
var TimerBar = function (_a) {
    var interval = _a.interval, initStartTime = _a.initStartTime, forcePause = _a.forcePause;
    var prevPause = (0, usePrevious_1.default)(forcePause);
    var _b = (0, react_1.useState)(), style = _b[0], setStyle = _b[1];
    (0, react_1.useEffect)(function () {
        if (prevPause !== forcePause)
            return;
        var frameId;
        var start = initStartTime;
        var step = function (time) {
            var timestamp = performance.timeOrigin + time;
            if (!start)
                start = timestamp;
            var diff = timestamp - start;
            var percentage = Math.min(diff / interval, 1);
            setStyle({ left: "".concat(percentage * 100, "%"), width: "".concat(100 - percentage * 100, "%") });
            if (diff <= interval) {
                frameId = requestAnimationFrame(step);
            }
        };
        frameId = requestAnimationFrame(step);
        return function () { return cancelAnimationFrame(frameId); };
    }, [interval, initStartTime, forcePause]);
    return (0, jsx_runtime_1.jsx)(Styled.TimerBar, { style: style });
};
var ImageWrapper = function (_a) {
    var item = _a.item;
    return item.link ? ((0, jsx_runtime_1.jsx)(Styled.ImageWrapperA, __assign({ href: item.link, target: item.newTab ? '_blank' : undefined, rel: "noopener noreferrer", draggable: false }, { children: (0, jsx_runtime_1.jsx)(Styled.Image, { src: item.image, draggable: false }) }))) : ((0, jsx_runtime_1.jsx)(Styled.ImageWrapperDiv, { children: (0, jsx_runtime_1.jsx)(Styled.Image, { src: item.image, draggable: false }) }));
};
var JSSlider = function (_a) {
    var _b, _c, _d;
    var items = _a.items, prevButton = _a.prevButton, nextButton = _a.nextButton, stateButton = _a.stateButton, _e = _a.duration, duration = _e === void 0 ? 200 : _e, _f = _a.interval, interval = _f === void 0 ? 0 : _f, _g = _a.onChangeItem, handleChangeItem = _g === void 0 ? function () { } : _g, _h = _a.onChangeState, handleChangeState = _h === void 0 ? function () { } : _h, width = _a.width, height = _a.height, startEffect = _a.startEffect;
    if (!items.length)
        return null;
    var initialStyle = { transform: "translate3d(0%, 0, 0)" };
    var mainEl = (0, react_1.useRef)(null);
    var mainWidth = (0, react_1.useMemo)(function () { var _a; return ((_a = mainEl.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0; }, [(_b = mainEl.current) === null || _b === void 0 ? void 0 : _b.clientWidth]);
    var swipeSize = (0, react_1.useMemo)(function () { var _a, _b; return (_b = (((_a = mainEl.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0) / 4) !== null && _b !== void 0 ? _b : 100; }, [(_c = mainEl.current) === null || _c === void 0 ? void 0 : _c.clientWidth]);
    var _j = (0, react_1.useState)({ visible: items[0] }), item = _j[0], setItem = _j[1];
    var _k = (0, react_1.useState)(initialStyle), style = _k[0], setStyle = _k[1];
    var _l = (0, react_1.useState)(), timerId = _l[0], setTimerId = _l[1];
    var _m = (0, react_1.useState)(new Date().getTime()), startTime = _m[0], setStartTime = _m[1];
    var _o = (0, react_1.useState)(), diff = _o[0], setDiff = _o[1];
    var _p = (0, react_1.useReducer)(function (v) { return ++v; }, 0), timerBarPause = _p[0], setTimerBarPause = _p[1];
    var _q = (0, react_1.useState)(), touch = _q[0], setTouch = _q[1];
    (0, react_1.useEffect)(function () { return setButtonEvent(prevButton, handlePrev); }, [item.visible, prevButton]);
    (0, react_1.useEffect)(function () { return setButtonEvent(nextButton, handleNext); }, [item.visible, nextButton]);
    (0, react_1.useEffect)(function () {
        if (!stateButton)
            return;
        var handleClick = function () { return (timerId ? handlePause() : handlePlay()); };
        stateButton.addEventListener('click', handleClick);
        return function () { return stateButton.removeEventListener('click', handleClick); };
    }, [timerId, stateButton, startTime, diff]);
    (0, react_1.useEffect)(function () {
        if (touch) {
            setItem(function (item) { return ({ visible: item.prev ? item.prev : item.next ? item.next : item.visible }); });
            setTouch(undefined);
            return;
        }
        if (item.prev) {
            setStyle({ transform: "translate3d(0%, 0, 0)", transition: "transform ".concat(duration, "ms ease") });
        }
        else if (item.next) {
            setStyle({ transform: "translate3d(-100%, 0, 0)", transition: "transform ".concat(duration, "ms ease") });
        }
        else {
            setStyle(initialStyle);
        }
    }, [item]);
    (0, react_1.useEffect)(function () {
        if (item.prev) {
            handleChangeState('play');
            handleChangeItem(item.prev);
        }
        if (item.next) {
            handleChangeState('play');
            handleChangeItem(item.next);
        }
    }, [item.prev, item.next]);
    var setButtonEvent = function (el, handler) {
        if (!el)
            return;
        var handlerMiddleware = function () {
            setStartTime(new Date().getTime());
            handleAutoPlay();
            handler();
        };
        el.addEventListener('click', handlerMiddleware);
        return function () { return el.removeEventListener('click', handlerMiddleware); };
    };
    var effect;
    if (!startEffect)
        effect = react_1.useEffect;
    else if (startEffect === 'useEffectOnce')
        effect = useEffectOnce_1.default;
    else
        effect = startEffect;
    effect(function () {
        handlePlay();
    }, []);
    (0, react_1.useEffect)(function () { return function () {
        clearTimeout(timerId);
        clearInterval(timerId);
    }; }, [timerId]);
    var getIndex = function (item) { return items.findIndex(function (v) { return v.order === item.order; }); };
    var getNeighbor = function (arg) {
        var index = typeof arg !== 'number' ? getIndex(arg) : arg;
        var item = typeof arg !== 'number' ? arg : items[arg];
        var prevIndex = index === 0 ? items.length - 1 : index - 1;
        var prev = items[prevIndex];
        var nextIndex = index === items.length - 1 ? 0 : index + 1;
        var next = items[nextIndex];
        var visible = item;
        return { prev: prev, visible: visible, next: next };
    };
    var handlePrev = function () { return handleBoth('prev'); };
    var handleNext = function () { return handleBoth('next'); };
    var handleBoth = function (type) {
        setStartTime(new Date().getTime());
        setStyle(type === 'next' ? initialStyle : { transform: "translate3d(-100%, 0, 0)" });
        setItem(function (item) {
            var _a;
            var _b;
            return (__assign(__assign({}, getNeighbor((_b = item[type]) !== null && _b !== void 0 ? _b : item.visible)), (_a = {}, _a[type === 'prev' ? 'next' : 'prev'] = undefined, _a)));
        });
    };
    var handleAutoPlay = function () { return setTimerId(setInterval(handleNext, interval)); };
    var handleTimeoutInterval = function (timeout_interval, interval) {
        setTimerId(setTimeout(function () {
            handleNext();
            setTimerId(setInterval(handleNext, interval));
        }, timeout_interval));
    };
    var handlePlay = function () {
        if (!interval)
            return;
        var continueTime = interval - (diff !== null && diff !== void 0 ? diff : 0);
        setStartTime(new Date().getTime() + continueTime - interval);
        handleChangeState('play');
        handleTimeoutInterval(continueTime, interval);
    };
    var handlePause = function () {
        var diff = new Date().getTime() - startTime;
        setDiff(diff);
        setTimerBarPause();
        handleChangeState('pause');
        clearInterval(timerId);
        setTimerId(undefined);
    };
    var handleTransitionEnd = function () {
        setItem(function (item) { return ({ visible: item.prev ? item.prev : item.next ? item.next : item.visible }); });
    };
    /** For mobile device */
    var handleTouchStart = function (e) {
        if (touch)
            return;
        handlePause();
        var posX = e.touches.item(0).clientX;
        setTouch({ initX: posX });
    };
    var handleTouchMove = (0, react_1.useCallback)(function (e) {
        if (!touch)
            return;
        var posX = e.touches.item(0).clientX;
        var state = posX - touch.initX < 0 ? 'forward' : posX === touch.initX ? 'same' : 'backward';
        var prev, next;
        var additionalTransform = '';
        if (state === 'forward') {
            next = getNeighbor(item.visible).next;
        }
        else if (state === 'backward') {
            prev = getNeighbor(item.visible).prev;
            additionalTransform = 'translate3d(-100%, 0, 0) ';
        }
        setTouch(function (touch) { return (touch ? __assign(__assign({}, touch), { lastX: posX, style: { transform: additionalTransform + "translate3d(".concat(posX - touch.initX, "px, 0, 0)") }, prev: prev, next: next }) : undefined); });
    }, [touch]);
    var handleTouchEnd = (0, react_1.useCallback)(function (e) {
        if (touch === null || touch === void 0 ? void 0 : touch.lastX) {
            var timingFunc_1 = functions_1.TIMINGFUNC_MAP['ease'];
            var start_1;
            var initX_1 = touch.lastX - touch.initX;
            var isChange_1 = Math.abs(initX_1) > swipeSize;
            var isNext_1 = Math.sign(initX_1) < 0;
            var toX_1 = isChange_1 ? Math.sign(initX_1) * mainWidth : 0;
            var step_1 = function (time) {
                if (!start_1)
                    start_1 = time;
                var diff = time - start_1;
                var percentage = Math.min(diff / duration, 1);
                setTouch(function (touch) {
                    if (touch) {
                        var defaultTransform = "translate3d(".concat((toX_1 - initX_1) * timingFunc_1(percentage) + initX_1, "px, 0, 0) ");
                        var additionalTransform = "translate3d(-100%, 0, 0) ";
                        var transform = touch.prev ? additionalTransform + defaultTransform : defaultTransform;
                        return __assign(__assign({}, touch), { style: { transform: transform } });
                    }
                    else {
                        return undefined;
                    }
                });
                if (diff <= duration) {
                    requestAnimationFrame(step_1);
                }
                else {
                    if (isChange_1) {
                        if (isNext_1)
                            handleNext();
                        else
                            handlePrev();
                    }
                }
            };
            requestAnimationFrame(step_1);
        }
        else {
            setTouch(undefined);
            handlePlay();
        }
    }, [touch]);
    return ((0, jsx_runtime_1.jsxs)(Styled.Container, __assign({ ref: mainEl, style: { width: width, height: height } }, { children: [!!interval && (0, jsx_runtime_1.jsx)(TimerBar, { interval: interval - duration - 500, initStartTime: startTime, forcePause: timerBarPause }), (0, jsx_runtime_1.jsxs)(Styled.ImagesWrapper, __assign({ style: (_d = touch === null || touch === void 0 ? void 0 : touch.style) !== null && _d !== void 0 ? _d : style, onTransitionEnd: handleTransitionEnd, 
                /** For mobile device */
                onContextMenu: function (e) { return e.preventDefault(); }, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd }, { children: [!item.prev && !!(touch === null || touch === void 0 ? void 0 : touch.prev) && (0, jsx_runtime_1.jsx)(ImageWrapper, { item: touch.prev }, touch.prev.order), !!item.prev && (0, jsx_runtime_1.jsx)(ImageWrapper, { item: item.prev }, item.prev.order), (0, jsx_runtime_1.jsx)(ImageWrapper, { item: item.visible }, item.visible.order), !!item.next && (0, jsx_runtime_1.jsx)(ImageWrapper, { item: item.next }, item.next.order), !item.next && !!(touch === null || touch === void 0 ? void 0 : touch.next) && (0, jsx_runtime_1.jsx)(ImageWrapper, { item: touch.next }, touch.next.order)] }))] })));
};
exports.default = JSSlider;
