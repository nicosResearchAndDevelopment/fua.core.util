const os = require('os');

exports.FUA_REMOTES   = process.env.FUA_REMOTES;
exports.FUA_RESOURCES = process.env.FUA_RESOURCES;
exports.FUA_JS_LIB    = process.env.FUA_JS_LIB;
exports.FUA_JS_APP    = process.env.FUA_JS_APP;

exports.OS_PLATFORM     = os.platform();
exports.OS_ARCHITECTURE = os.arch();

exports.$$iterator      = Symbol.iterator;
exports.$$asyncIterator = Symbol.asyncIterator;
exports.$$species       = Symbol.species;
exports.$$hasInstance   = Symbol.hasInstance;
exports.$$toStringTag   = Symbol.toStringTag;
