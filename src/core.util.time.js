const
    _ = require('./core.util.js');

function _parseDate(value) {
    if (value) return new Date(value);
    if (_.isNumber(value)) return new Date(1e3 * value);
    return new Date();
} // _parseDate

function _stringifyZone(date) {
    const
        offset = date.getTimezoneOffset(),
        hour   = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0'),
        minute = Math.floor(Math.abs(offset) % 60).toString().padStart(2, '0');
    return (offset > 0 ? '-' : '+') + hour + ':' + minute;
} // _stringifyZone

function _stringifyTime(date) {
    const
        hour        = date.getHours().toString().padStart(2, '0'),
        minute      = date.getMinutes().toString().padStart(2, '0'),
        second      = date.getSeconds().toString().padStart(2, '0'),
        millisecond = date.getMilliseconds().toString().padStart(3, '0');
    return hour + ':' + minute + ':' + second + '.' + millisecond;
} // _stringifyTime

function _stringifyDate(date) {
    const
        year  = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day   = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
} // _stringifyDate

// SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-time
exports.time = function (value) {
    const
        date    = _parseDate(value),
        timeStr = _stringifyTime(date),
        zoneStr = _stringifyZone(date);
    return timeStr + zoneStr;
};

exports.time.now = function () {
    return 1e-3 * Date.now();
};

// SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-date
exports.time.date = function (value) {
    const
        date    = _parseDate(value),
        dateStr = _stringifyDate(date),
        zoneStr = _stringifyZone(date);
    return dateStr + zoneStr;
};

// SEE https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz/xs-datetime
exports.time.datetime = function (value) {
    const
        date    = _parseDate(value),
        dateStr = _stringifyDate(date),
        timeStr = _stringifyTime(date),
        zoneStr = _stringifyZone(date);
    return dateStr + 'T' + timeStr + zoneStr;
};

// console.log(exports.time());
// console.log(exports.time.date());
// console.log(exports.time.datetime());
// console.log(new Date().toISOString());
