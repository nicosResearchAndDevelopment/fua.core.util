const errors = require('@fua/core.errors');

exports.Error = errors.Error;
exports.TypeError = errors.TypeError;

exports.HTTPRequestError = errors.http.RequestError;
exports.HTTPResponseError = errors.http.ResponseError;

exports.errorToJSON = errors.toJSON;
exports.errorFromJSON = errors.fromJSON;

exports.HTTP_STATUS_CODES = errors.http.statusCodes;

exports.createErrorClass = errors.createClass;
