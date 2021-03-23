const
    _                    = require('./core.util.js'),
    RE_unsafeRegExpChars = /[./\\+*?([{|^$]/g;

/**
 * @param {string} string
 * @param {string} [flags]
 * @returns {RegExp}
 */
exports.stringToRegExp = function (string, flags) {
    return new RegExp(string.replace(RE_unsafeRegExpChars, (match) => '\\' + match), flags);
};