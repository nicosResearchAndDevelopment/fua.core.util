const
    _ = require('./core.util.js');

/**
 * @param {Function} fn
 * @param {...any} args
 * @returns {Promise<any>}
 */
exports.promify = function (fn, ...args) {
    return new Promise((resolve, reject) => {
        args.push((err, ...results) =>
            err ? reject(err)
                : results.length > 1 ? resolve(results)
                    : resolve(results[0]));
        fn.apply(this, args);
    });
};

/**
 * @param {Function} fn
 * @returns {function(...args: any): Promise<any>}
 */
exports.promisify = function (fn) {
    return function (...args) {
        args.unshift(fn);
        return _.promify.apply(this, args);
    };
};

/**
 * @param {Function} fn
 * @param {...any} args
 * @param {Function} cb
 * @returns {void}
 */
exports.callbacky = function (fn, ...args /*, cb*/) {
    const cb = args.pop();
    try {
        const result = fn.apply(this, args);
        if (result instanceof Promise) result
            .then(res => cb(null, res))
            .catch(err => cb(err));
        else cb(null, result);
    } catch (err) {
        cb(err);
    }
};

/**
 * @param {Function} fn
 * @returns {function(...args: any, cb: Function): void}
 */
exports.callbackify = function (fn) {
    return function (...args) {
        args.unshift(fn);
        return exports.callbacky.apply(this, args);
    };
};
