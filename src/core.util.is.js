const
    _ = require('./core.util.js');

/**
 * @param {any} value
 * @returns {boolean}
 */
_.isDefined = function (value) {
    return value !== void 0;
};

/**
 * @param {true|any} value
 * @returns {boolean}
 */
_.isTruthy = function (value) {
    return !!value;
};

/**
 * @param {false|any} value
 * @returns {boolean}
 */
_.isFalsy = function (value) {
    return !value;
};

/**
 * @param {boolean|any} value
 * @returns {boolean}
 */
_.isBoolean = function (value) {
    return typeof value === 'boolean';
};

/**
 * @param {number|any} value
 * @returns {boolean}
 */
_.isNumber = function (value) {
    return typeof value === 'number' && !isNaN(value);
};

/**
 * @param {number|any} value
 * @returns {boolean}
 */
_.isInteger = function (value) {
    //return _.isNumber(value) && value === parseInt(value);
    return Number.isInteger(value);
};

/**
 * @param {string|any} value
 * @returns {boolean}
 */
_.isString = function (value) {
    return typeof value === 'string';
};

/**
 * @param {symbol|any} value
 * @returns {boolean}
 */
_.isSymbol = function (value) {
    return typeof value === 'symbol';
};

/**
 * @param {Function|any} value
 * @returns {boolean}
 */
_.isFunction = function (value) {
    return typeof value === 'function';
};

/**
 * @param {Object|any} value
 * @returns {boolean}
 */
_.isObject = function (value) {
    return value && typeof value === 'object';
};

/**
 * @param {Array|any} value
 * @returns {boolean}
 */
_.isArray = Array.isArray;

/**
 * @param {Iterable|any} value
 * @returns {boolean}
 */
_.isIterable = function (value) {
    return value && _.isFunction(value[Symbol.iterator]);
};

/**
 * @param {Date|any} value
 * @returns {boolean}
 */
_.isDate = function (value) {
    return value && value instanceof Date
        && !isNaN(value.valueOf());
};

/**
 * @param {Error|any} value
 * @returns {boolean}
 */
_.isError = function (value) {
    return value instanceof Error;
};

/**
 * @param {Buffer|any} value
 * @returns {boolean}
 */
_.isBuffer = function (value) {
    return value instanceof Buffer;
};

/**
 * @param {TypedArray|any} value
 * @returns {boolean}
 */
_.isTypedArray = function (value) {
    // TODO check and improve
    return ArrayBuffer.isView(value) && !(value instanceof DataView);
};