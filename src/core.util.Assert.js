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
 * TODO what is the preferred behaviour?
 * 1. a default assert with 'unspecified source' (current)
 * 2. a hint to the developer to use its own assert (below)
 * @type {function(value: *, errMsg?: string, errType?: Class<Error>): void}
 * @deprecated
 */
exports.assert = exports.Assert();

///**
// * @throws {Error}
// */
//exports.assert = function () {
//    throw new Error('core.util : this is not the assert of your module \n'
//        + 'Please create a util.Assert instance by yourself or use your existing one!');
//};
