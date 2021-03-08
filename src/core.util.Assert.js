const
    _ = require('./core.util.js');

_.Assert = function (source = 'unspecified source') {
    function assert(value, errMsg = 'unspecified error', errType = Error) {
        if (!value) {
            const err = new errType(source + ' : ' + errMsg);
            Error.captureStackTrace(err, assert);
            throw err;
        }
    }

    return assert;
};