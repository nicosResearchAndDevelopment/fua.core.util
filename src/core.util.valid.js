const
    _ = require('./core.util.js');

_.StringValidator = function (pattern) {
    function stringValidator(value) {
        return _.isString(value) && pattern.test(value);
    }

    return stringValidator;
};

_.ArrayValidator = function (checker) {
    function arrayValidator(value) {
        return _.isArray(value) && value.every(checker);
    }

    return arrayValidator;
};