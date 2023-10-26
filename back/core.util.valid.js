const
    _ = require('./core.util.js');

/**
 * @param {Object} subject
 * @param {Object} target
 * @returns {boolean}
 */
exports.objectMatches = function (subject, target) {
    if (Object.is(subject, target)) return true;
    if (!(_.isObject(subject) && _.isObject(target))) return false;
    if (_.isArray(subject) && _.isArray(target))
        return subject.length === target.length && target.every((value, index) => _.objectMatches(subject[index], value));
    return Object.keys(target).every(key => _.objectMatches(subject[key], target[key]));
};

/**
 * @param {Object} subject
 * @param {Object} target
 * @returns {boolean}
 */
exports.objectEquals = function (subject, target) {
    if (Object.is(subject, target)) return true;
    if (!(_.isObject(subject) && _.isObject(target))) return false;
    if (_.isArray(subject) && _.isArray(target))
        return subject.length === target.length && target.every((value, index) => _.objectEquals(subject[index], value));
    const sKeys = Object.keys(subject).sort(), tKeys = Object.keys(target).sort();
    return _.objectEquals(sKeys, tKeys) && _.objectEquals(sKeys.map(key => subject[key]), tKeys.map(key => target[key]));
};
