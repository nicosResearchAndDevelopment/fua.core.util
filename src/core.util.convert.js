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
 * @param {Object} target
 * @param {...Object} sourceArr
 * @returns {Object}
 */
exports.extendObject = function (target = {}, ...sourceArr) {
    for (let source of sourceArr) {
        for (let [key, sVal] of Object.entries(source)) {
            const tVal  = target[key];
            target[key] = _.isObject(sVal) && !_.isArray(sVal)
                ? _.extendObject(_.isObject(tVal) && !_.isArray(tVal) ? tVal : {}, sVal)
                : sVal;
        }
    }
    return target;
};

/**
 * @param {Object} target
 * @param {...Object} sourceArr
 * @returns {Object}
 */
exports.reduceObject = function (target = {}, ...sourceArr) {
    for (let source of sourceArr) {
        for (let [key, sVal] of Object.entries(source)) {
            const tVal = target[key];
            if (_.objectEquals(tVal, sVal)) delete target[key];
            else if (_.isObject(sVal) && !_.isArray(sVal) && _.isObject(tVal) && !_.isArray(tVal))
                _.reduceObject(tVal, sVal);
        }
    }
    return target;
};
