import React from 'react';
var isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
var useEffectOnce = function (cb, deps) {
    console.log(process.env.NODE_ENV);
    var ref = React.useRef(!isDev);
    React.useEffect(function () {
        console.log(ref.current);
        if (!ref.current) {
            ref.current = true;
            return undefined;
        }
        return cb();
    }, deps);
};
export default useEffectOnce;
