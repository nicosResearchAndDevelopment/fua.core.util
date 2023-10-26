const tty = require('@nrd/fua.core.tty');

exports.logText     = (txt) => tty.log.text(txt);
exports.logWarning  = (msg = 'warning') => tty.log.warning(msg);
exports.logDone     = (msg = 'done') => tty.log.done(msg);
exports.logSuccess  = (msg = 'success') => tty.log.success(msg);
exports.logError    = (txt) => tty.error(txt);
exports.logObject   = (txt) => tty.log(txt);
exports.logTodo     = (msg = '') => tty.log.todo(msg);
exports.logRequest  = (request) => tty.log.request(request);
exports.logResponse = (response) => tty.log.response(response);
exports.logTable    = (rows, columns, tableName) => tty.log.table(rows, columns, tableName);
