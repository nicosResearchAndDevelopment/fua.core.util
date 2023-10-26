const
    _ = require('./core.util.js');

/**
 * @param {RegExp} pattern
 * @returns {function(string|any): boolean}
 * @constructor
 */
exports.StringValidator = function (pattern) {
    _.assert(_.isRegExp(pattern), 'invalid pattern');

    /**
     * @param {string|any} value
     * @returns {boolean}
     */
    function stringValidator(value) {
        return _.isString(value) && pattern.test(value);
    }

    return stringValidator;
};

/**
 * @param {function(any): boolean} checker
 * @returns {function(Array|any): boolean}
 * @constructor
 */
exports.ArrayValidator = function (checker) {
    _.assert(_.isFunction(checker), 'invalid checker');

    /**
     * @param {Array|any} value
     * @returns {boolean}
     */
    function arrayValidator(value) {
        return _.isArray(value) && value.every(checker);
    }

    return arrayValidator;
};

/**
 * @param {Array<any>} choices
 * @returns {function(any): boolean}
 * @constructor
 */
exports.EnumValidator = function (choices) {
    _.assert(_.isArray(choices), 'invalid choices');

    /**
     * @param {any} value
     * @returns {boolean}
     */
    function enumValidator(value) {
        return choices.includes(value);
    }

    return enumValidator;
};

/**
 * @param {Function} classFunction
 * @returns {function(any): boolean}
 * @constructor
 */
exports.InstanceValidator = function (classFunction) {
    _.assert(_.isFunction(classFunction), 'invalid classFunction');

    /**
     * @param {any} value
     * @returns {boolean}
     */
    function instanceValidator(value) {
        return value instanceof classFunction;
    }

    return instanceValidator;
};

/**
 * @param {'undefined'|'boolean'|'number'|'bigint'|'string'|'symbol'|'object'|'function'} datatype
 * @returns {function(any): boolean}
 * @constructor
 */
exports.DatatypeValidator = function (datatype) {
    _.assert(_.isDatatype(datatype), 'invalid datatype');

    /**
     * @param {any} value
     * @returns {boolean}
     */
    function datatypeValidator(value) {
        return typeof value === datatype;
    }

    return datatypeValidator;
};

/**
 * @param {Array<function(any): boolean>} concatenations
 * @returns {function(any): boolean}
 * @constructor
 */
exports.ConcatenationValidator = function (concatenations) {
    _.assert(_.isArray(concatenations) && concatenations.every(_.isFunction), 'invalid concatenations');

    /**
     * @param {any} value
     * @returns {boolean}
     */
    function concatenationValidator(value) {
        return concatenations.every(validator => validator(value));
    }

    return concatenationValidator;
};

/**
 * @param {Array<function(any): boolean>} alternatives
 * @returns {function(any): boolean}
 * @constructor
 */
exports.AlternativeValidator = function (alternatives) {
    _.assert(_.isArray(alternatives) && alternatives.every(_.isFunction), 'invalid alternatives');

    /**
     * @param {any} value
     * @returns {boolean}
     */
    function alternativeValidator(value) {
        return alternatives.some(validator => validator(value));
    }

    return alternativeValidator;
};

/**
 * @param {function(any): boolean} validator
 * @returns {function(null | any): boolean}
 * @constructor
 */
exports.OptionalValidator = function (validator) {
    _.assert(_.isFunction(validator), 'invalid validator');

    /**
     * @param {null | any} value
     * @returns {boolean}
     */
    function optionalValidator(value) {
        return _.isNull(value) || validator(value);
    }

    return optionalValidator;
};
