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

/**
 * @typedef {{
 *     name?: string,
 *     code?: number | string,
 *     message?: string,
 *     cause?: ErrorJSON,
 *     [other: string]: boolean | number | string
 * }} ErrorJSON
 */

/**
 * @param {Error | ErrorJSON | string} err
 * @returns {ErrorJSON}
 */
exports.errorToJSON = function (err) {
    if (_.isFunction(err?.toJSON)) return err.toJSON();
    const
        {name, code, message, cause, ...other} = _.isObject(err) ? err : {message: err},
        errJSON                                = {
            name:    _.isString(name) ? name : 'Error',
            code:    _.isString(code) || _.isNumber(code) ? code : undefined,
            message: _.isString(message) ? message : 'unknown',
            cause:   cause ? _.errorToJSON(cause) : undefined
        };
    for (let [key, value] of Object.entries(other)) {
        if (errJSON[key]) continue;
        if (!_.isPrimitive(value)) continue;
        errJSON[key] = value;
    }
    return errJSON;
};

exports.errorFromJSON = function (errJSON) {
    if (errJSON instanceof Error) return errJSON;
    const
        customErrors                           = {
            HTTPRequestError:  () => new _.HTTPRequestError(errJSON),
            HTTPResponseError: () => new _.HTTPResponseError(errJSON)
        },
        {name, code, message, cause, ...other} = _.isObject(errJSON) ? errJSON : {message: errJSON};
    if (name in customErrors) return customErrors[name]();
    const
        nativeErrors = {
            Error,
            TypeError
        },
        err          = new (nativeErrors[name] || Error)(
            _.isString(message) ? message : 'unknown',
            cause ? {cause: _.errorFromJSON(cause)} : undefined
        );
    if (_.isString(name)) err.name = name;
    if (_.isString(code) || _.isNumber(code)) err.code = code;
    Error.captureStackTrace(err, _.errorFromJSON);
    let errCause = err.cause;
    while (errCause) {
        Error.captureStackTrace(errCause, _.errorFromJSON);
        errCause = errCause.cause;
    }
    for (let [key, value] of Object.entries(other)) {
        if (err[key]) continue;
        if (!_.isPrimitive(value)) continue;
        err[key] = value;
    }
    return err;
};
