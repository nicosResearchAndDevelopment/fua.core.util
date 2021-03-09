const
    _ = require('./core.util.js');

/**
 * @param {RegExp} pattern
 * @returns {function(string|any): boolean}
 * @constructor
 */
_.StringValidator = function (pattern) {
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
_.ArrayValidator = function (checker) {
    /**
     * @param {Array|any} value
     * @returns {boolean}
     */
    function arrayValidator(value) {
        return _.isArray(value) && value.every(checker);
    }

    return arrayValidator;
};