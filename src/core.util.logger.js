const
    _         = require('./core.util.js'),
    _color    = require('./core.util.logger.colors.js'),
    {inspect} = require('util');

function _log(txt) {
    const
        ts  = _.NODE_PROD ? _.dateTime() : _.localTime(),
        log = _color.grey('[' + ts + ']') + ' ' + txt;
    process.stdout.write(log + '\n');
}

exports.logText = function (txt) {
    _log(txt);
};

exports.logWarning = function (msg = 'warning') {
    _log(_color.yellowBright(msg));
};

exports.logDone = function (msg = 'done') {
    _log(_color.green(msg));
};

exports.logSuccess = function (msg = 'success') {
    _log(_color.green(msg));
};

exports.logError = function (err) {
    _log(_color.redBright(err?.stack ?? err));
};

exports.logObject = function (obj) {
    // TODO implement own function
    _log(inspect(obj, {
        depth:   10,
        colors:  true,
        sorted:  true,
        getters: true
    }));
};

exports.logTodo = function (msg = '') {
    const temp = {name: _color.yellow(_color.bold('TODO')), message: msg};
    Error.captureStackTrace(temp, exports.logTodo);
    const trace = temp.stack.match(/^.*\r?\n.*/);
    _log(trace);
};
