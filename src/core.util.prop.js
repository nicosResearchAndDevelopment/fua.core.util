const
    _ = require('./core.util.js');

_.lockProp = function (obj, ...keys) {
    const lock = {writable: false, configurable: false};
    for (let key of keys) {
        Object.defineProperty(obj, key, lock);
    }
};

_.hideProp = function (obj, ...keys) {
    const hide = {enumerable: false};
    for (let key of keys) {
        Object.defineProperty(obj, key, hide);
    }
};