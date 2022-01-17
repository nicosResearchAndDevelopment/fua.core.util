const
    _    = require('./core.util.js'),
    _tty = require('./core.util.logger.tty.js');

function _log(txt) {
    const log = _tty.grey('[' + _.dateTime() + ']') + ' ' + txt;
    process.stdout.write(log + '\n'); // console.log(log);
}

exports.logText = function (txt) {
    _log(_tty.white(txt));
};

exports.logWarning = function (msg) {
    _log(_tty.lightYellow(msg));
};

exports.logError = function (err) {
    _log(_tty.lightRed(err?.stack ?? err));
};
