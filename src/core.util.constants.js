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

/** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status */
exports.HTTP_STATUS_CODES = Object.freeze({
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    103: 'Early Hints',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status',
    208: 'Already Reported',
    226: 'IM Used',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    // 306: 'unused',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I\'m a teapot',
    421: 'Misdirected Request',
    422: 'Unprocessable Content',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required'
});
