const is = require('@nrd/fua.core.is');
const ts = require('@nrd/fua.core.ts');

const _secondsToMS    = (value) => is.number(value) ? 1e3 * value : value;
exports.unixTime      = (rounded = false) => rounded ? ts.unix.rounded() : ts.unix();
exports.time          = (value) => ts.time(_secondsToMS(value));
exports.localTime     = (value) => ts.time.local(_secondsToMS(value));
exports.utcTime       = (value) => ts.time.utc(_secondsToMS(value));
exports.date          = (value) => ts.date(_secondsToMS(value));
exports.localDate     = (value) => ts.date.local(_secondsToMS(value));
exports.utcDate       = (value) => ts.date.utc(_secondsToMS(value));
exports.dateTime      = (value) => ts.dateTime(_secondsToMS(value));
exports.localDateTime = (value) => ts.dateTime.local(_secondsToMS(value));
exports.utcDateTime   = (value) => ts.dateTime.utc(_secondsToMS(value));
exports.duration      = (value, reference) => ts.duration(_secondsToMS(value), _secondsToMS(reference));
exports.pause         = (value) => ts.pause(_secondsToMS(value));
