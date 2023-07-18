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

//exports.SchemaValidator = function () {
//    // TODO http://json-schema.org/specification.html
//    const schema = {
//        $schema:     null,
//        $vocabulary: null,
//        $id:         null,
//        $ref:        null,
//        $dynamicRef: null,
//        $def:        null,
//        $comment:    null,
//        // subschemas with logic
//        allOf: 'array of json schemas',
//        anyOf: 'array of json schemas',
//        oneOf: 'array of json schemas',
//        not:   'json schema',
//        // conditional subschemas
//        if:               'json schema',
//        then:             'json schema',
//        else:             'json schema',
//        dependentSchemas: null,
//        // subschemas for arrays
//        prefixItems: 'array of json schemas',
//        items:       null,
//        contains:    null,
//        // subschemas for objects
//        properties:           null,
//        patternProperties:    null,
//        additionalProperties: null,
//        propertyNames:        null,
//        // unevaluated locations
//        unevaluatedItems:      null,
//        unevaluatedProperties: null,
//        // keywords for any instance type
//        type:  'string|string[]',
//        enum:  'string[]',
//        const: 'any',
//        // keywords for numeric instances
//        multipleOf:       'number',
//        maximum:          'number',
//        exclusiveMaximum: 'number',
//        minimum:          'number',
//        exclusiveMinimum: 'number',
//        // keywords for strings
//        maxLength: 'number',
//        minLength: 'number',
//        pattern:   'string|RegExp',
//        // keywords for arrays
//        maxItems:    'number',
//        minItems:    'number',
//        uniqueItems: 'boolean',
//        maxContains: 'number',
//        minContains: 'number',
//        // keywords for objects
//        maxProperties:     'number',
//        minProperties:     'number',
//        required:          'string[]',
//        dependentRequired: null,
//        // other keywords
//        format:           'string',
//        contentEncoding:  'string',
//        contentMediaType: 'string',
//        contentSchema:    'string',
//        // keywords for meta-data annotations
//        title:      'string',
//        default:    null,
//        deprecated: 'boolean',
//        readOnly:   'boolean',
//        writeOnly:  'boolean',
//        examples:   null
//    };
//};

/**
 * @param {Object} subject
 * @param {Object} target
 * @returns {boolean}
 */
exports.objectMatches = function (subject, target) {
    if (Object.is(subject, target)) return true;
    if (!(_.isObject(subject) && _.isObject(target))) return false;
    if (_.isArray(subject) && _.isArray(target))
        return subject.length === target.length && target.every((value, index) => _.objectMatches(subject[index], value));
    return Object.keys(target).every(key => _.objectMatches(subject[key], target[key]));
};

/**
 * @param {Object} subject
 * @param {Object} target
 * @returns {boolean}
 */
exports.objectEquals = function (subject, target) {
    if (Object.is(subject, target)) return true;
    if (!(_.isObject(subject) && _.isObject(target))) return false;
    if (_.isArray(subject) && _.isArray(target))
        return subject.length === target.length && target.every((value, index) => _.objectEquals(subject[index], value));
    const sKeys = Object.keys(subject).sort(), tKeys = Object.keys(target).sort();
    return _.objectEquals(sKeys, tKeys) && _.objectEquals(sKeys.map(key => subject[key]), tKeys.map(key => target[key]));
};
