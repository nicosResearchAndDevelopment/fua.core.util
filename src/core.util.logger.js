const
    _         = require('./core.util.js'),
    _color    = require('./core.util.logger.colors.js'),
    {inspect} = require('util');

function _log(txt) {
    const log = _color.grey('[' + _.dateTime() + ']') + ' ' + txt;
    process.stdout.write(log + '\n'); // console.log(log);
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
