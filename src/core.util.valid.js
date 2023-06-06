const
    _ = require('./core.util.js');

/**
 * @typedef {object} ValidationRule
 * @property {boolean} [optional]
 * @property {string|Array<string>} [type]
 * @property {Function|Array<Function>} [class]
 * @property {Array<any>} [enum]
 * @property {RegExp} [pattern]
 * @property {ValidationRule} [items]
 * @property {{[key: string]: ValidationRule}} [properties]
 * @property {ValidationRule} [not]
 * @property {Array<ValidationRule>} [and]
 * @property {Array<ValidationRule>} [or]
 * @property {Array<ValidationRule>} [xor]
 */

/**
 * @param {any} value
 * @param {ValidationRule} rule
 * @returns {boolean}
 */
exports.validate = function (value, rule) {
    return rule && (rule.optional && _.isNull(value) || (
        (!rule.type || (
            _.isArray(rule.type)
                ? rule.type.some(typeEntry => typeof value === typeEntry)
                : typeof value === rule.type
        ))
        && (!rule.class || (
            _.isArray(rule.class)
                ? rule.class.some(classEntry => value instanceof classEntry)
                : value instanceof rule.class
        ))
        && (!rule.enum || (
            rule.enum.some(entry => value === entry)
        ))
        && (!rule.pattern || (
            _.isString(value) && rule.pattern.test(value)
        ))
        && (!rule.items || (
            _.isArray(value) && value.every(
                (item) => _.validate(item, rule.items)
            )
        ))
        && (!rule.properties || (
            _.isObject(value) && Object.entries(rule.properties).every(
                ([key, subRule]) => _.validate(value[key], subRule)
            )
        ))
        && (!rule.not || (
            !_.validate(value, rule.not)
        ))
        && (!rule.and || (
            rule.and.every(andRule => _.validate(value, andRule))
        ))
        && (!rule.or || (
            rule.or.some(orRule => _.validate(value, orRule))
        ))
        && (!rule.xor || (
            rule.xor.filter(xorRule => _.validate(value, xorRule)).length === 1
        ))
    ));
}; // validate = function (value, rule)

/**
 * @param {RegExp} pattern
 * @returns {function(string|any): boolean}
 * @constructor
 */
exports.StringValidator = function (pattern) {
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
    /**
     * @param {Array|any} value
     * @returns {boolean}
     */
    function arrayValidator(value) {
        return _.isArray(value) && value.every(checker);
    }

    return arrayValidator;
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
