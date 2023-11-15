const is                 = require('@nrd/fua.core.is');
exports.isDefined        = (value) => is.defined(value);
exports.isUndefined      = (value) => is.undefined(value);
exports.isNull           = (value) => is.null(value);
exports.isNotNull        = (value) => is.notnull(value);
exports.isPrimitive      = (value) => is.primitive(value);
exports.isPrimitiveArray = (value) => is.array(value) && value.every(is.primitive);
exports.isTruthy         = (value) => is.boolean.truthy(value);
exports.isFalsy          = (value) => is.boolean.falsy(value);
exports.isBoolean        = (value) => is.boolean(value);
exports.isBooleanArray   = (value) => is.array.booleans(value);
exports.isNumber         = (value) => is.number.float(value);
exports.isAnyNumber      = (value) => is.number(value);
exports.isNumberArray    = (value) => is.array(value) && value.every(is.number.float);
exports.isFiniteNumber   = (value) => is.number.float.finite(value);
exports.isInteger        = (value) => is.number.integer(value);
exports.isBigInt         = (value) => is.number.bigint(value);
exports.isString         = (value) => is.string(value);
exports.isStringArray    = (value) => is.array.strings(value);
exports.isSymbol         = (value) => is.symbol(value);
exports.isFunction       = (value) => is.function(value);
exports.isObject         = (value) => is.object(value);
exports.isNativeObject   = (value) => is.object.native(value);
exports.isObjectArray    = (value) => is.array(value) && value.every(is.object);
exports.isArray          = (value) => is.array(value);
exports.isIterable       = (value) => value && is.function(value[Symbol.iterator]);
exports.isDate           = (value) => is.date.valid(value);
exports.isAnyDate        = (value) => is.date(value);
exports.isRegExp         = (value) => value instanceof RegExp;
exports.isError          = (value) => is.object.instance.error(value);
exports.isBuffer         = (value) => is.object.instance.buffer(value);
exports.isTypedArray     = (value) => ArrayBuffer.isView(value) && !(value instanceof DataView);
const _DatatypeList      = Object.freeze(['undefined', 'boolean', 'number', 'bigint', 'string', 'symbol', 'object', 'function']);
exports.isDatatype       = (value) => _DatatypeList.includes(value);

exports.StringValidator        = function (pattern) {
    return is.validator.string(pattern);
};
exports.ArrayValidator         = function (checker) {
    return is.validator.array(checker);
};
exports.EnumValidator          = function (choices) {
    return is.validator.enum(choices);
};
exports.InstanceValidator      = function (classFunction) {
    return is.validator.instance(classFunction);
};
exports.DatatypeValidator      = function (datatype) {
    return is.validator.datatype(datatype);
};
exports.ConcatenationValidator = function (concatenations) {
    return is.validator.concatenation(concatenations);
};
exports.AlternativeValidator   = function (alternatives) {
    return is.validator.alternative(alternatives);
};
exports.OptionalValidator      = function (validator) {
    return is.validator.optional(validator);
};

exports.extractType = (value) => is.analyse(value);
