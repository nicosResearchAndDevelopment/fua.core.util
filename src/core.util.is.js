const
    _ = require('./core.util.js');

/**
 * @param {any} value
 * @returns {boolean}
 */
exports.isDefined = function (value) {
    return value !== void 0;
};

/**
 * @param {any} value
 * @returns {boolean}
 */
exports.isUndefined = function (value) {
    return value === void 0;
};

/**
 * @param {undefined|null|any} value
 * @returns {boolean}
 */
exports.isNull = function (value) {
    return (value ?? null) === null;
};

/**
 * @param {undefined|null|any} value
 * @returns {boolean}
 */
exports.isNotNull = function (value) {
    return !_.isNull(value);
};

/**
 * @param {boolean|number|string|any} value
 * @returns {boolean}
 */
exports.isPrimitive = function (value) {
    return _.isBoolean(value) || _.isAnyNumber(value) || _.isString(value);
};

/**
 * @param {Array<boolean|number|string>|any} value
 * @returns {boolean}
 */
exports.isPrimitiveArray = function (value) {
    return _.isArray(value) && value.every(_.isPrimitive);
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
 * @param {Array<boolean>|any} value
 * @returns {boolean}
 */
exports.isBooleanArray = function (value) {
    return _.isArray(value) && value.every(_.isBoolean);
};

/**
 * @param {number|any} value
 * @returns {boolean}
 */
exports.isNumber = function (value) {
    return typeof value === 'number' && !isNaN(value);
};

/**
 * @param {number|any} value
 * @returns {boolean}
 */
exports.isAnyNumber = function (value) {
    return typeof value === 'number';
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
exports.isFiniteNumber = function (value) {
    return _.isNumber(value) && Number.isFinite(value);
};

/**
 * @param {number|any} value
 * @returns {boolean}
 */
exports.isInteger = function (value) {
    return _.isNumber(value) && Number.isInteger(value);
};

/**
 * @param {BigInt|any} value
 * @returns {boolean}
 */
exports.isBigInt = function (value) {
    return typeof value === 'bigint';
};

/**
 * @param {string|any} value
 * @returns {boolean}
 */
exports.isString = function (value) {
    return typeof value === 'string';
};

/**
 * @param {Array<string>|any} value
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
 * @param {Object|any} value
 * @returns {boolean}
 */
exports.isNativeObject = function (value) {
    return _.isObject(value) && value.__proto__ === Object.prototype;
    // return _.isObject(value) && (value.__proto__ === Object.prototype || _.isNull(value.__proto__));
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
exports.isArray = function (value) {
    // return value instanceof Array;
    return Array.isArray(value);
};

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
 * @param {Date|any} value
 * @returns {boolean}
 */
exports.isAnyDate = function (value) {
    return value instanceof Date;
};

/**
 * @param {RegExp|any} value
 * @returns {boolean}
 */
exports.isRegExp = function (value) {
    return value instanceof RegExp;
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
    // return value instanceof Buffer;
    return Buffer.isBuffer(value);
};

/**
 * @param {TypedArray|any} value
 * @returns {boolean}
 */
exports.isTypedArray = function (value) {
    // TODO check and improve
    return ArrayBuffer.isView(value) && !(value instanceof DataView);
};

const _DatatypeList = Object.freeze(['undefined', 'boolean', 'number', 'bigint', 'string', 'symbol', 'object', 'function']);

/**
 * @param {'undefined'|'boolean'|'number'|'bigint'|'string'|'symbol'|'object'|'function'|any} value
 * @returns {boolean}
 */
exports.isDatatype = function (value) {
    return _DatatypeList.includes(value);
};
