const
    _ = require('./core.util.js');

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

    return value[Symbol.toStringTag] || value.__proto__.constructor.name || 'Object';
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
