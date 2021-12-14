const
    _              = require('./core.util.js'),
    defaultSource  = 'unspecified source',
    defaultMessage = 'unspecified error';

/**
 * @param source
 * @returns {function(value: any, errMsg?: string, errType?: Class<Error>): void}
 * @constructor
 */
exports.Assert = function (source = defaultSource) {
    /**
     * @param {any} value
     * @param {string} [errMsg]
     * @param {Class<Error>} [errType]
     */
    function assert(value, errMsg = defaultMessage, errType = Error) {
        if (!value) {
            const err = new errType(source + ' : ' + errMsg);
            Error.captureStackTrace(err, assert);
            throw err;
        }
    }

    return assert;
};

/**
 * @param {any} value
 * @param {string} [errMsg]
 * @param {Class<Error>} [errType]
 */
exports.assert = function (value, errMsg = defaultMessage, errType = Error) {
    if (!value) {
        const err = new errType(errMsg);
        Error.captureStackTrace(err, exports.assert);
        throw err;
    }
};

/**
 * @param {any} value
 * @param {string} [errMsg]
 */
exports.assertNull = function (value, errMsg = 'expected to be null') {
    if (_.isNull(value)) {
        const err = new Error(errMsg);
        Error.captureStackTrace(err, exports.assertNull);
        throw err;
    }
};

/**
 * @param {any} value
 * @param {string} [errMsg]
 */
exports.assertNotNull = function (value, errMsg = 'expected not to be null') {
    if (_.isNotNull(value)) {
        const err = new Error(errMsg);
        Error.captureStackTrace(err, exports.assertNotNull);
        throw err;
    }
};

/**
 * @param {any} value
 * @param {string} [errMsg]
 */
exports.assertFalse = function (value, errMsg = 'expected to be false') {
    if (value) {
        const err = new Error(errMsg);
        Error.captureStackTrace(err, exports.assertFalse);
        throw err;
    }
};

/**
 * @param {any} value
 * @param {string} [errMsg]
 */
exports.assertTrue = function (value, errMsg = 'expected to be true') {
    if (!value) {
        const err = new Error(errMsg);
        Error.captureStackTrace(err, exports.assertTrue);
        throw err;
    }
};

/**
 * @param {any} value
 * @param {any} other
 * @param {string} [errMsg]
 */
exports.assertEquals = function (value, other, errMsg = 'expected to be equal') {
    if (value !== other) {
        const err = new Error(errMsg);
        Error.captureStackTrace(err, exports.assertEquals);
        throw err;
    }
};

/**
 * @param {any} value
 * @param {any} other
 * @param {string} [errMsg]
 */
exports.assertNotEquals = function (value, other, errMsg = 'expected not to be equal') {
    if (value === other) {
        const err = new Error(errMsg);
        Error.captureStackTrace(err, exports.assertNotEquals);
        throw err;
    }
};
