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
 * Returns a string representing the type of the given value.
 * @param {any} value
 * @returns {string}
 */
exports.extractType = function (value) {
    const nativeType = typeof value;
    if (nativeType !== 'object') return nativeType;

    if (value === null) return 'null';
    if (value instanceof Date) return 'Date';
    if (value instanceof Buffer) return 'Buffer';

    if (value instanceof Set) {
        if (value.size === 0) return 'Set';
        const entryTypes = new Set();
        for (let entry of value.values()) {
            entryTypes.add(_.extractType(entry));
        }
        return 'Set<' + Array.from(entryTypes.values()).sort().join('|') + '>';
    }

    if (value instanceof Map) {
        if (value.size === 0) return 'Map';
        const keyTypes = new Set(), entryTypes = new Set();
        for (let [key, entry] of value.entries()) {
            keyTypes.add(_.extractType(key));
            entryTypes.add(_.extractType(entry));
        }
        return 'Map<' + Array.from(keyTypes.values()).sort().join('|') + ',' + Array.from(entryTypes.values()).sort().join('|') + '>';
    }

    if (_.isArray(value)) {
        if (value.length === 0) return 'Array';
        const entryTypes = new Set();
        for (let entry of value) {
            entryTypes.add(_.extractType(entry));
        }
        return 'Array<' + Array.from(entryTypes.values()).sort().join('|') + '>';
    }

    if (value.__proto__.constructor === Object) {
        const entries = Object.entries(value);
        if (entries.length === 0) return 'Object';
        const entryTypes = new Map();
        for (let [key, entry] of entries) {
            entryTypes.set(key, _.extractType(entry));
        }
        return '{' + Array.from(entryTypes.entries()).map(([key, entry]) => key + ':' + entry).sort().join(',') + '}';
    }

    return value[_.$$toStringTag] || value.__proto__.constructor.name || 'Object';
};

/**
 * @param {string} [errName="Error"]
 * @param {string} [errCode='']
 * @returns {Function}
 */
exports.createErrorClass = function (errName = 'Error', errCode = '') {

    return class extends Error {

        #name = errName;
        #code = errCode;

        constructor(message = '', code) {
            super(message);
            if (!errCode && code) this.#code = code;
        }

        get name() {
            return this.#name;
        }

        get code() {
            return this.#code;
        }

        static get name() {
            return errName;
        }
    };
};
