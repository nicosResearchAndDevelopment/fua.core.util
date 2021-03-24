const
    _ = require('./core.util.js');

/**
 * @param {Object} obj
 * @param {...string} keys
 */
exports.lockProp = function (obj, ...keys) {
    const lock = {writable: false, configurable: false};
    for (let key of keys) {
        const writable = !obj.hasOwnProperty(key) || Reflect.getOwnPropertyDescriptor(obj, key).configurable;
        if (writable) Object.defineProperty(obj, key, lock);
    }
    return _;
};

/**
 * @param {Object} obj
 * @param {number} [depth=0]
 */
exports.lockAllProp = function (obj, depth = 0) {
    const lock = {writable: false, configurable: false};
    for (let [key, value] of Object.entries(obj)) {
        const writable = !obj.hasOwnProperty(key) || Reflect.getOwnPropertyDescriptor(obj, key).configurable;
        if (writable) {
            Object.defineProperty(obj, key, lock);
            if (depth > 0 && value instanceof Object)
                _.lockAllProp(value, depth - 1);
        }
    }
    return _;
};

/**
 * A default lock defines a one-time setter on every key with the existing value as default.
 * @param {Object} obj
 * @param {...string} keys
 */
exports.defaultLockProp = function (obj, ...keys) {
    for (let key of keys) {
        const writable = !obj.hasOwnProperty(key) || Reflect.getOwnPropertyDescriptor(obj, key).configurable;
        if (writable) {
            let
                current  = obj[key],
                assigned = false;
            Object.defineProperty(obj, key, {
                configurable: false,
                get() {
                    return current;
                },
                set(value) {
                    if (!assigned) {
                        assigned = true;
                        current  = value;
                    }
                }
            });
        }
    }
    return _;
};

/**
 * @param {Object} obj
 * @param {...string} keys
 */
exports.hideProp = function (obj, ...keys) {
    const hide = {enumerable: false};
    for (let key of keys) {
        Object.defineProperty(obj, key, hide);
    }
    return _;
};