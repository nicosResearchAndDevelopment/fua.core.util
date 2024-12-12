const objects = require('@fua/core.objects');

exports.extendObject = (target = {}, ...sourceArr) => objects.extend(target, ...sourceArr);
exports.reduceObject = (target = {}, ...sourceArr) => objects.reduce(target, ...sourceArr);
exports.lockProp = (obj, ...keys) => objects.lock.props(obj, ...keys);
exports.lockAllProp = (obj, depth = 0) => objects.lock.recursive(obj, depth);
exports.defaultLockProp = (obj, ...keys) => objects.lock.defaults(obj, ...keys);
exports.hideProp = (obj, ...keys) => objects.hide.props(obj, ...keys);
exports.freezeAllProp = (obj, depth = 0) => objects.freeze.recursive(obj, depth);
exports.objectMatches = (subject, target) => objects.matches(subject, target);
exports.objectEquals = (subject, target) => objects.equals(subject, target);
exports.toArray = (value) => objects.array(value);
exports.toFrozenArray = (value) => objects.array.freeze(value);
