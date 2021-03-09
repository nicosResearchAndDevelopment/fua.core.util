const
    _ = require('./core.util.js');

/**
 * @param source
 * @returns {function(any, string, class<Error>?): void}
 * @constructor
 */
_.Assert = function (source = 'unspecified source') {
    /**
     * @param {any} value
     * @param {string} errMsg
     * @param {class<Error>} [errType]
     */
    function assert(value, errMsg = 'unspecified error', errType = Error) {
        if (!value) {
            const err = new errType(source + ' : ' + errMsg);
            Error.captureStackTrace(err, assert);
            throw err;
        }
    }

    return assert;
};