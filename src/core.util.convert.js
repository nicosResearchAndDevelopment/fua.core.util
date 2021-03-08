const
    _                    = require('./core.util.js'),
    RE_unsafeRegExpChars = /[./\\+*?([{|^$]/g;

_.stringToRegExp = function (string, flags) {
    return new RegExp(string.replace(RE_unsafeRegExpChars, (match) => '\\' + match), flags);
};