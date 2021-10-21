const
    _ = require('./core.util.js');

function _parseDate(value) {
    if (value) return new Date(value);
    if (_.isNumber(value)) return new Date(1e3 * value);
    return new Date();
} // _parseDate

function _stringifyZoneOffset(date) {
    const
        offset = date.getTimezoneOffset(),
        hour   = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0'),
        minute = Math.floor(Math.abs(offset) % 60).toString().padStart(2, '0');

    return (offset > 0 ? '-' : '+') + hour + ':' + minute;
} // _stringifyZoneOffset

function _stringifyTime(date) {
    const
        hour        = date.getHours().toString().padStart(2, '0'),
        minute      = date.getMinutes().toString().padStart(2, '0'),
        second      = date.getSeconds().toString().padStart(2, '0'),
        millisecond = date.getMilliseconds().toString().padStart(3, '0');

    return hour + ':' + minute + ':' + second + '.' + millisecond;
} // _stringifyTime

function _stringifyTimeUTC(date) {
    const
        hour        = date.getUTCHours().toString().padStart(2, '0'),
        minute      = date.getUTCMinutes().toString().padStart(2, '0'),
        second      = date.getUTCSeconds().toString().padStart(2, '0'),
        millisecond = date.getUTCMilliseconds().toString().padStart(3, '0');

    return hour + ':' + minute + ':' + second + '.' + millisecond;
} // _stringifyTimeUTC

function _stringifyDate(date) {
    const
        year  = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day   = date.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
} // _stringifyDate

function _stringifyDateUTC(date) {
    const
        year  = date.getUTCFullYear().toString(),
        month = (date.getUTCMonth() + 1).toString().padStart(2, '0'),
        day   = date.getUTCDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
} // _stringifyDateUTC

/**
 * @returns {number}
 * @see https://en.wikipedia.org/wiki/Unix_time Unix time
 */
exports.unixTime = function () {
    return 1e-3 * Date.now();
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#time XML Schema - xsd:time
 */
exports.time = function (value) {
    const
        date    = _parseDate(value),
        timeStr = _stringifyTime(date),
        zoneStr = _stringifyZoneOffset(date);

    return timeStr + zoneStr;
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#time XML Schema - xsd:time
 */
exports.utcTime = function (value) {
    const
        date    = _parseDate(value),
        timeStr = _stringifyTimeUTC(date);

    return timeStr + 'Z';
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#date XML Schema - xsd:date
 */
exports.date = function (value) {
    const
        date    = _parseDate(value),
        dateStr = _stringifyDate(date),
        zoneStr = _stringifyZoneOffset(date);

    return dateStr + zoneStr;
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#date XML Schema - xsd:date
 */
exports.utcDate = function (value) {
    const
        date    = _parseDate(value),
        dateStr = _stringifyDateUTC(date);

    return dateStr + 'Z';
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#dateTime XML Schema - xsd:dateTime
 */
exports.dateTime = function (value) {
    const
        date    = _parseDate(value),
        dateStr = _stringifyDate(date),
        timeStr = _stringifyTime(date),
        zoneStr = _stringifyZoneOffset(date);

    return dateStr + 'T' + timeStr + zoneStr;
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#dateTime XML Schema - xsd:dateTime
 */
exports.utcDateTime = function (value) {
    const
        date    = _parseDate(value),
        dateStr = _stringifyDateUTC(date),
        timeStr = _stringifyTimeUTC(date);

    return dateStr + 'T' + timeStr + 'Z';
};

console.log(exports.unixTime());
console.log(exports.time());
console.log(exports.date());
console.log(exports.dateTime());
console.log(exports.utcTime());
console.log(exports.utcDate());
console.log(exports.utcDateTime());
console.log(new Date().toISOString());
