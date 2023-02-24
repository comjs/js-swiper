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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Styled from '../styles/styled';
import { TIMINGFUNC_MAP } from '../utils/functions';
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import usePrevious from '../utils/usePrevious';
import useEffectOnce from '../utils/useEffectOnce';
var TimerBar = function (_a) {
    var interval = _a.interval, initStartTime = _a.initStartTime, forcePause = _a.forcePause;
    var prevPause = usePrevious(forcePause);
    var _b = useState(), style = _b[0], setStyle = _b[1];
    useEffect(function () {
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
    return _jsx(Styled.TimerBar, { style: style });
};
var ImageWrapper = function (_a) {
    var item = _a.item;
    return item.link ? (_jsx(Styled.ImageWrapperA, __assign({ href: item.link, target: item.newTab ? '_blank' : undefined, rel: "noopener noreferrer", draggable: false }, { children: _jsx(Styled.Image, { src: item.image, draggable: false }) }))) : (_jsx(Styled.ImageWrapperDiv, { children: _jsx(Styled.Image, { src: item.image, draggable: false }) }));
};
var JSSlider = function (_a) {
    var _b, _c, _d;
    var items = _a.items, prevButton = _a.prevButton, nextButton = _a.nextButton, stateButton = _a.stateButton, _e = _a.duration, duration = _e === void 0 ? 200 : _e, _f = _a.interval, interval = _f === void 0 ? 0 : _f, _g = _a.onChangeItem, handleChangeItem = _g === void 0 ? function () { } : _g, _h = _a.onChangeState, handleChangeState = _h === void 0 ? function () { } : _h, width = _a.width, height = _a.height, startEffect = _a.startEffect;
    if (!items.length)
        return null;
    var initialStyle = { transform: "translate3d(0%, 0, 0)" };
    var mainEl = useRef(null);
    var mainWidth = useMemo(function () { var _a; return ((_a = mainEl.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0; }, [(_b = mainEl.current) === null || _b === void 0 ? void 0 : _b.clientWidth]);
    var swipeSize = useMemo(function () { var _a, _b; return (_b = (((_a = mainEl.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0) / 4) !== null && _b !== void 0 ? _b : 100; }, [(_c = mainEl.current) === null || _c === void 0 ? void 0 : _c.clientWidth]);
    var _j = useState({ visible: items[0] }), item = _j[0], setItem = _j[1];
    var _k = useState(initialStyle), style = _k[0], setStyle = _k[1];
    var _l = useState(), timerId = _l[0], setTimerId = _l[1];
    var _m = useState(new Date().getTime()), startTime = _m[0], setStartTime = _m[1];
    var _o = useState(), diff = _o[0], setDiff = _o[1];
    var _p = useReducer(function (v) { return ++v; }, 0), timerBarPause = _p[0], setTimerBarPause = _p[1];
    var _q = useState(), touch = _q[0], setTouch = _q[1];
    useEffect(function () { return setButtonEvent(prevButton, handlePrev); }, [item.visible, prevButton]);
    useEffect(function () { return setButtonEvent(nextButton, handleNext); }, [item.visible, nextButton]);
    useEffect(function () {
        if (!stateButton)
            return;
        var handleClick = function () { return (timerId ? handlePause() : handlePlay()); };
        stateButton.addEventListener('click', handleClick);
        return function () { return stateButton.removeEventListener('click', handleClick); };
    }, [timerId, stateButton, startTime, diff]);
    useEffect(function () {
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
    useEffect(function () {
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
        effect = useEffect;
    else if (startEffect === 'useEffectOnce')
        effect = useEffectOnce;
    else
        effect = startEffect;
    effect(function () {
        handlePlay();
    }, []);
    useEffect(function () { return function () {
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
    var handleTouchMove = useCallback(function (e) {
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
    var handleTouchEnd = useCallback(function (e) {
        if (touch === null || touch === void 0 ? void 0 : touch.lastX) {
            var timingFunc_1 = TIMINGFUNC_MAP['ease'];
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
    return (_jsxs(Styled.Container, __assign({ ref: mainEl, style: { width: width, height: height } }, { children: [!!interval && _jsx(TimerBar, { interval: interval - duration - 500, initStartTime: startTime, forcePause: timerBarPause }), _jsxs(Styled.ImagesWrapper, __assign({ style: (_d = touch === null || touch === void 0 ? void 0 : touch.style) !== null && _d !== void 0 ? _d : style, onTransitionEnd: handleTransitionEnd, 
                /** For mobile device */
                onContextMenu: function (e) { return e.preventDefault(); }, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd }, { children: [!item.prev && !!(touch === null || touch === void 0 ? void 0 : touch.prev) && _jsx(ImageWrapper, { item: touch.prev }, touch.prev.order), !!item.prev && _jsx(ImageWrapper, { item: item.prev }, item.prev.order), _jsx(ImageWrapper, { item: item.visible }, item.visible.order), !!item.next && _jsx(ImageWrapper, { item: item.next }, item.next.order), !item.next && !!(touch === null || touch === void 0 ? void 0 : touch.next) && _jsx(ImageWrapper, { item: touch.next }, touch.next.order)] }))] })));
};
export default JSSlider;
