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

/**
 * @param {Object} target
 * @param {...Object} sourceArr
 * @returns {Object}
 */
exports.extendObject = function (target = {}, ...sourceArr) {
    for (let source of sourceArr) {
        for (let [key, sVal] of Object.entries(source)) {
            const tVal  = target[key];
            target[key] = _.isNativeObject(sVal)
                ? _.extendObject(_.isNativeObject(tVal) ? tVal : {}, sVal)
                : sVal;
        }
    }
    return target;
};

/**
 * @param {Object} target
 * @param {...Object} sourceArr
 * @returns {Object}
 */
exports.reduceObject = function (target = {}, ...sourceArr) {
    for (let source of sourceArr) {
        for (let [key, sVal] of Object.entries(source)) {
            const tVal = target[key];
            if (_.objectEquals(tVal, sVal)) delete target[key];
            else if (_.isNativeObject(sVal) && _.isNativeObject(tVal))
                _.reduceObject(tVal, sVal);
        }
    }
    return target;
};
