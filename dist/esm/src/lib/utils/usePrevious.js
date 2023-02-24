import { useEffect, useRef } from 'react';
var usePrevious = function (value) {
    var ref = useRef();
    useEffect(function () {
        ref.current = value;
    });
    return ref.current;
};
export default usePrevious;
