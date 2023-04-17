const
    _ = require('./core.util.js');

exports.Error     = Error;
exports.TypeError = TypeError;

/** An error that occurred on the server while processing an incoming request. */
exports.HTTPRequestError = class HTTPRequestError extends Error {

    constructor(...args) {
        let statusCode, statusText, httpRequest, errorCause;
        if (_.isNumber(args[0])) {
            statusCode  = _.isInteger(args[0]) && _.HTTP_STATUS_CODES[args[0]] && args[0] || 500;
            statusText  = _.isString(args[1]) && args[1] || _.HTTP_STATUS_CODES[statusCode];
            httpRequest = _.isObject(args[1]) && args[1].headers && args[1] || _.isObject(args[2]) && args[2].headers && args[2] || null;
            errorCause  = _.isObject(args[1]) && args[1].cause || _.isObject(args[2]) && args[2].cause || _.isObject(args[3]) && args[3].cause || null;
        } else if (_.isString(args[0])) {
            statusCode  = 500;
            statusText  = args[0] || _.HTTP_STATUS_CODES[statusCode];
            httpRequest = _.isObject(args[1]) && args[1].headers && args[1] || null;
            errorCause  = _.isObject(args[1]) && args[1].cause || _.isObject(args[2]) && args[2].cause || null;
        } else if (_.isObject(args[0])) {
            statusCode  = _.isInteger(args[0].status) && _.HTTP_STATUS_CODES[args[0].status] && args[0].status || _.isInteger(args[1].statusCode) && _.HTTP_STATUS_CODES[args[1].statusCode] && args[1].statusCode || 500;
            statusText  = _.isString(args[0].statusText) && args[0].statusText || _.isString(args[0].statusMessage) && args[0].statusMessage || _.HTTP_STATUS_CODES[statusCode];
            httpRequest = args[0].headers && args[0] || _.isObject(args[1]) && args[1].headers && args[1] || null;
            errorCause  = _.isObject(args[1]) && args[1].cause || _.isObject(args[2]) && args[2].cause || null;
        } else {
            statusCode  = 500;
            statusText  = _.HTTP_STATUS_CODES[statusCode];
            httpRequest = null;
            errorCause  = _.isObject(args[1]) && args[1].cause || null;
        }

        super(`[${statusCode}] ${statusText}`, errorCause && {cause: errorCause});
        this.code       = `ERR_HTTP_STATUS_${statusCode}`;
        this.status     = this.statusCode = statusCode;
        this.statusText = this.statusMessage = statusText;
        this.request    = httpRequest;
        _.hideProp(this, 'request', 'message', 'code', 'status', 'statusText');
        _.lockProp(this, 'request', 'message', 'code', 'status', 'statusText', 'statusCode', 'statusMessage');
    }

};

/** An error that occurred on the client because of a faulty server response. */
exports.HTTPResponseError = class HTTPResponseError extends Error {

    constructor(...args) {
        let statusCode, statusText, httpResponse, errorCause;
        if (_.isNumber(args[0])) {
            statusCode   = _.isInteger(args[0]) && _.HTTP_STATUS_CODES[args[0]] && args[0] || 500;
            statusText   = _.isString(args[1]) && args[1] || _.HTTP_STATUS_CODES[statusCode];
            httpResponse = _.isObject(args[1]) && args[1].headers && args[1] || _.isObject(args[2]) && args[2].headers && args[2] || null;
            errorCause   = _.isObject(args[1]) && args[1].cause || _.isObject(args[2]) && args[2].cause || _.isObject(args[3]) && args[3].cause || null;
        } else if (_.isString(args[0])) {
            statusCode   = 500;
            statusText   = args[0] || _.HTTP_STATUS_CODES[statusCode];
            httpResponse = _.isObject(args[1]) && args[1].headers && args[1] || null;
            errorCause   = _.isObject(args[1]) && args[1].cause || _.isObject(args[2]) && args[2].cause || null;
        } else if (_.isObject(args[0])) {
            statusCode   = _.isInteger(args[0].status) && _.HTTP_STATUS_CODES[args[0].status] && args[0].status || _.isInteger(args[1].statusCode) && _.HTTP_STATUS_CODES[args[1].statusCode] && args[1].statusCode || 500;
            statusText   = _.isString(args[0].statusText) && args[0].statusText || _.isString(args[0].statusMessage) && args[0].statusMessage || _.HTTP_STATUS_CODES[statusCode];
            httpResponse = args[0].headers && args[0] || _.isObject(args[1]) && args[1].headers && args[1] || null;
            errorCause   = _.isObject(args[1]) && args[1].cause || _.isObject(args[2]) && args[2].cause || null;
        } else {
            statusCode   = 500;
            statusText   = _.HTTP_STATUS_CODES[statusCode];
            httpResponse = null;
            errorCause   = _.isObject(args[1]) && args[1].cause || null;
        }

        super(`[${statusCode}] ${statusText}`, errorCause && {cause: errorCause});
        this.code       = `ERR_HTTP_STATUS_${statusCode}`;
        this.status     = this.statusCode = statusCode;
        this.statusText = this.statusMessage = statusText;
        this.response   = httpResponse;
        _.hideProp(this, 'response', 'message', 'code', 'status', 'statusText');
        _.lockProp(this, 'response', 'message', 'code', 'status', 'statusText', 'statusCode', 'statusMessage');
    }

};
