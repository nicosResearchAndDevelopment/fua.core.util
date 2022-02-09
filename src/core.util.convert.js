const
    _                    = require('./core.util.js'),
    RE_unsafeRegExpChars = /[./\\+*?([{|^$]/g;

/**
 * @param {string} string
 * @param {string} [flags]
 * @returns {RegExp}
 */
exports.stringToRegExp = function (string, flags) {
    return new RegExp(string.replace(RE_unsafeRegExpChars, (match) => '\\' + match), flags);
};

/**
 * Converts any value to an array.
 * If the value is undefined or null, the result will be an empty array.
 * If the value is a native datatype, the result will be an array with the value as only entry.
 * If the value is an array itself, the result will be as is an the same object as the value.
 * If the value is an iterable object or an iterator instance, the result will be an array with the collected entries.
 * If the value is a function or an object, the result will be an array with the value as only entry.
 * In any other case, which there should be none, the array is empty for a falsy value and has one entry for a truthy value.
 * @param {undefined|boolean|number|string|symbol|null|Array|TypedArray|Iterable|Iterator|Object|function|any} value
 * @returns {Array}
 */
exports.toArray = function (value) {
    switch (typeof value) {
        case 'undefined':
            return [];
        case 'boolean':
        case 'number':
        case 'string':
        case 'symbol':
            return [value];
        case 'object':
            if (!value) return [];
            if (_.isArray(value)) return value;
            if (_.isFunction(value[Symbol.iterator])) return Array.from(value);
            if (_.isFunction(value.next)) {
                const result = [];
                let current  = value.next();
                while (current?.done === false) {
                    result.push(current.value);
                    current = value.next();
                }
                if (current?.done === true) return result;
            }
            return [value];
        case 'function':
            return [value];
        default:
            if (!value) return [];
            return [value];
    }
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
