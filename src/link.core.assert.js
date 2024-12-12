const assert = require('@fua/core.assert');
const is = require('@fua/core.is');

exports.Assert = function (source = 'unspecified source') {
  return (value, errMsg = 'unspecified error', errType = Error) => assert(value, source + ' : ' + errMsg, errType);
};
exports.assert = (value, errMsg = 'unspecified error', errType = Error) => assert(value, errMsg, errType);
exports.assertNull = (value, errMsg = 'expected to be null') => assert(is.null(value), errMsg);
exports.assertNotNull = (value, errMsg = 'expected not to be null') => assert(is.notnull(value), errMsg);
exports.assertFalse = (value, errMsg = 'expected to be false') => assert(!value, errMsg);
exports.assertTrue = (value, errMsg = 'expected to be true') => assert(!!value, errMsg);
exports.assertEquals = (value, other, errMsg = 'expected to be equal') => assert(value === other, errMsg);
exports.assertNotEquals = (value, other, errMsg = 'expected not to be equal') => assert(value !== other, errMsg);
exports.assertTodo = (errMsg = 'not implemented') => assert.todo(errMsg);
