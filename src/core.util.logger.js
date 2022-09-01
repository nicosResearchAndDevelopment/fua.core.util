const
    _         = require('./core.util.js'),
    _color    = require('./core.util.logger.colors.js'),
    {inspect} = require('util');

function _log(txt) {
    const
        ts  = _.NODE_PROD ? _.dateTime() : _.localTime(),
        log = _color.grey('[' + ts + ']') + ' ' + txt;

    process.stdout.write(log + '\n');
} // _log

exports.logText = function (txt) {
    _log(txt);
}; // logText

exports.logWarning = function (msg = 'warning') {
    _log(_color.yellowBright(msg));
}; // logWarning

exports.logDone = function (msg = 'done') {
    _log(_color.green(msg));
}; // logDone

exports.logSuccess = function (msg = 'success') {
    _log(_color.green(msg));
}; // logSuccess

exports.logError = function (err) {
    _log(_color.redBright(err?.stack ?? err));
}; // logError

exports.logObject = function (obj) {
    // TODO implement own function
    _log(inspect(obj, {
        depth:   10,
        colors:  true,
        sorted:  true,
        getters: true
    }));
}; // logObject

exports.logTodo = function (msg = '') {
    const
        tempErrorTarget = {
            name:    _color.yellow(_color.bold('TODO')),
            message: msg.trim().replace(/\s+/g, ' ')
        },
        prevTraceLimit  = Error.stackTraceLimit;

    Error.stackTraceLimit = 1;
    Error.captureStackTrace(tempErrorTarget, exports.logTodo);
    Error.stackTraceLimit = prevTraceLimit;

    _log(tempErrorTarget.stack);
}; // logTodo

exports.logRequest = function (request) {
    // TODO improve
    let str = `${request.method} ${request.url} HTTP/1.1`;
    for (let [key, value] of Object.entries(request.headers)) {
        str += `\n  ${key}: ${value}`;
    }
    _log(str);
}; // logRequest

exports.logResponse = function (response) {
    // TODO improve
    let str = `HTTP/1.1 ${response.statusCode} ${response.statusMessage}`;
    for (let [key, value] of Object.entries(response.headers)) {
        str += `\n  ${key}: ${value}`;
    }
    _log(str);
}; // logResponse
