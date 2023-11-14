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

/**
 * @param {string} [errName="Error"]
 * @param {string} [errCode='']
 * @param {Function} [errInit]
 * @returns {Function}
 */
exports.createErrorClass = function (errName = 'Error', errCode = '', errInit) {
    const CustomError = function (message = '', ...args) {
        if (!new .target) {
            const that = new CustomError(message, ...args);
            Error.captureStackTrace(that, CustomError);
            return that;
        }
        Error.captureStackTrace(this, CustomError);
        Object.defineProperties(this, {
            message: {value: message}
        });
        if (errInit) errInit.apply(this, args);
    }; // CustomError

    CustomError.prototype = Object.create(Error.prototype);

    Object.defineProperties(CustomError.prototype, {
        constructor: {value: CustomError},
        name:        {value: errName},
        code:        {value: errCode}
    });

    Object.defineProperties(CustomError, {
        name: {value: errName}
    });

    return CustomError;
};
