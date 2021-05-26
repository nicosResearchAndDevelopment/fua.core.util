const
    _ = require('./core.util.js');

/**
 * @param {any} value
 * @returns {boolean}
 */
exports.isDefined = function (value) {
    return value !== void 0; // REM got changed: look out for bugs
    //return (value ?? null) !== null;
};

/**
 * @param {undefined|null|any} value
 * @returns {boolean}
 */
exports.isNull = function (value) {
    //return value !== void 0; // REM got changed: look out for bugs
    return (value ?? null) === null;
};

/**
 * @param {true|any} value
 * @returns {boolean}
 */
exports.isTruthy = function (value) {
    return !!value;
};

/**
 * @param {false|any} value
 * @returns {boolean}
 */
exports.isFalsy = function (value) {
    return !value;
};

/**
 * @param {boolean|any} value
 * @returns {boolean}
 */
exports.isBoolean = function (value) {
    return typeof value === 'boolean';
};

/**
 * @param {number|any} value
 * @returns {boolean}
 */
exports.isNumber = function (value) {
    return typeof value === 'number' && !isNaN(value);
};

/**
 * @param {Array<Number>|any} value
 * @returns {boolean}
 */
exports.isNumberArray = function (value) {
    return _.isArray(value) && value.every(_.isNumber);
};

/**
 * @param {number|any} value
 * @returns {boolean}
 */
exports.isInteger = function (value) {
    //return _.isNumber(value) && value === parseInt(value);
    return Number.isInteger(value);
};

/**
 * @param {string|any} value
 * @returns {boolean}
 */
exports.isString = function (value) {
    return typeof value === 'string';
};

/**
 * @param {Array<String>|any} value
 * @returns {boolean}
 */
exports.isStringArray = function (value) {
    return _.isArray(value) && value.every(_.isString);
};

/**
 * @param {symbol|any} value
 * @returns {boolean}
 */
exports.isSymbol = function (value) {
    return typeof value === 'symbol';
};

/**
 * @param {Function|any} value
 * @returns {boolean}
 */
exports.isFunction = function (value) {
    return typeof value === 'function';
};

/**
 * @param {Object|any} value
 * @returns {boolean}
 */
exports.isObject = function (value) {
    return value && typeof value === 'object';
};

/**
 * @param {Array<Object>|any} value
 * @returns {boolean}
 */
exports.isObjectArray = function (value) {
    return _.isArray(value) && value.every(_.isObject);
};

/**
 * @param {Array|any} value
 * @returns {boolean}
 */
exports.isArray = Array.isArray;

/**
 * @param {Iterable|any} value
 * @returns {boolean}
 */
exports.isIterable = function (value) {
    return value && _.isFunction(value[Symbol.iterator]);
};

/**
 * @param {Date|any} value
 * @returns {boolean}
 */
exports.isDate = function (value) {
    return value && value instanceof Date
        && !isNaN(value.valueOf());
};

/**
 * @param {Error|any} value
 * @returns {boolean}
 */
exports.isError = function (value) {
    return value instanceof Error;
};

/**
 * @param {Buffer|any} value
 * @returns {boolean}
 */
exports.isBuffer = function (value) {
    return value instanceof Buffer;
};

/**
 * @param {TypedArray|any} value
 * @returns {boolean}
 */
exports.isTypedArray = function (value) {
    // TODO check and improve
    return ArrayBuffer.isView(value) && !(value instanceof DataView);
};