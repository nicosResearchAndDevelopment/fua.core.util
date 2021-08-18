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
