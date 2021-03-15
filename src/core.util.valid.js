const
    _ = require('./core.util.js');

_.validate = function (value, rule) {
    return rule
        && (!rule.type || (
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
        ));
};

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

//_.SchemaValidator = function () {
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