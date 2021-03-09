const
    _ = require('./core.util.js');

/**
 * @param {Object} obj
 * @param {...string} keys
 */
_.lockProp = function (obj, ...keys) {
    const lock = {writable: false, configurable: false};
    for (let key of keys) {
        Object.defineProperty(obj, key, lock);
    }
};

/**
 * @param {Object} obj
 * @param {...string} keys
 */
_.hideProp = function (obj, ...keys) {
    const hide = {enumerable: false};
    for (let key of keys) {
        Object.defineProperty(obj, key, hide);
    }
};