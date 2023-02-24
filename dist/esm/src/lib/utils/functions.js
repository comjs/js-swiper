export var TIMINGFUNC_MAP = {
    linear: function (t) { return t; },
    'ease': function (t) { return t * t / (2 * (t * t - t) + 1); },
    'ease-in': function (t) { return t * t; },
    'ease-out': function (t) { return t * (2 - t); },
    'ease-in-out': function (t) { return (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t); },
};
