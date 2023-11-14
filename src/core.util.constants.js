const os = require('os');

exports.FUA_REMOTES   = process.env.FUA_REMOTES;
exports.FUA_RESOURCES = process.env.FUA_RESOURCES;
exports.FUA_JS_LIB    = process.env.FUA_JS_LIB;
exports.FUA_JS_APP    = process.env.FUA_JS_APP;

exports.OS_PLATFORM     = os.platform();
exports.OS_ARCHITECTURE = os.arch();

exports.NODE_ENV  = process.env.NODE_ENV || '';
exports.NODE_PROD = (process.env.NODE_ENV === 'production');
exports.NODE_TEST = ('describe' in global);

exports.SYM_ITERATOR       = Symbol.iterator;
exports.SYM_ASYNC_ITERATOR = Symbol.asyncIterator;
exports.SYM_SPECIES        = Symbol.species;
exports.SYM_HAS_INSTANCE   = Symbol.hasInstance;
exports.SYM_TO_STRING_TAG  = Symbol.toStringTag;

exports.NUM_PI      = Math.PI;
exports.NUM_E       = Math.E;
exports.NUM_SQRT2   = Math.SQRT2;
exports.NUM_SQRT1_2 = Math.SQRT1_2;
exports.NUM_LN2     = Math.LN2;
exports.NUM_LN10    = Math.LN10;
exports.NUM_LOG2E   = Math.LOG2E;
exports.NUM_LOG10E  = Math.LOG10E;

exports.NUM_EPSILON     = Number.EPSILON;
exports.NUM_MIN_FLOAT   = Number.MIN_VALUE;
exports.NUM_MAX_FLOAT   = Number.MAX_VALUE;
exports.NUM_MIN_INTEGER = Number.MIN_SAFE_INTEGER;
exports.NUM_MAX_INTEGER = Number.MAX_SAFE_INTEGER;
