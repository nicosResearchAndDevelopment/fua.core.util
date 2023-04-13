const
    _ = require('./core.util.js');

exports.Error     = Error;
exports.TypeError = TypeError;

exports.HTTPResponseError = new class HTTPResponseError extends Error {
    /**
     * @param {number | string} [statusCode=500]
     * @param {string} [statusMessage]
     */
    constructor(statusCode, statusMessage) {
        if (_.isInteger(statusCode) && statusCode >= 400 && _.HTTP_STATUS_CODES[statusCode]) {
            statusMessage = _.isString(statusMessage) ? statusMessage : _.HTTP_STATUS_CODES[statusCode];
        } else {
            statusMessage = _.isString(statusMessage) ? statusMessage : _.isString(statusCode) ? statusCode : _.HTTP_STATUS_CODES[500];
            statusCode    = 500;
        }
        super(statusMessage);
        this.code = statusCode;
        _.lockProp(this, 'message', 'code');
    }

    get status() {
        return this.code;
    }

    get statusText() {
        return this.message;
    }
};
