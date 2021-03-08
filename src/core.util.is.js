const
    _ = require('./core.util.js');

_.isDefined = function (value) {
    return value !== void 0;
};

_.isTruthy = function (value) {
    return !!value;
};

_.isFalsy = function (value) {
    return !value;
};

_.isBoolean = function (value) {
    return typeof value === 'boolean';
};

_.isNumber = function (value) {
    return typeof value === 'number' && !isNaN(value);
};

_.isInteger = function (value) {
    return _.isNumber(value) && value === parseInt(value);
};

_.isString = function (value) {
    return typeof value === 'string';
};

_.isSymbol = function (value) {
    return typeof value === 'symbol';
};

_.isFunction = function (value) {
    return typeof value === 'function';
};

_.isObject = function (value) {
    return value && typeof value === 'object';
};

_.isArray = Array.isArray;

_.isIterable = function (value) {
    return value && _.isFunction(value[Symbol.iterator]);
};

_.isDate = function (value) {
    return value && value instanceof Date
        && !isNaN(value.valueOf());
};