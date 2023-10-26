const objects = require('@nrd/fua.core.objects');

exports.extendObject = (target = {}, ...sourceArr) => objects.extend(target, ...sourceArr);
exports.reduceObject = (target = {}, ...sourceArr) => objects.reduce(target, ...sourceArr);
// exports.lockProp        = (obj, ...keys) => null;
// exports.lockAllProp     = (obj, depth = 0) => null;
// exports.defaultLockProp = (obj, ...keys) => null;
// exports.hideProp        = (obj, ...keys) => null;
// exports.freezeAllProp   = (obj, depth = 0) => null;
exports.objectMatches = (subject, target) => objects.matches(subject, target);
exports.objectEquals  = (subject, target) => objects.equals(subject, target);
