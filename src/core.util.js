const constants = require('./core.util.constants.js');
Object.assign(exports, constants);

const is = require('./core.util.is.js');
Object.assign(exports, is);

const valid = require('./core.util.valid.js');
Object.assign(exports, valid);

const assert = require('./core.util.Assert.js');
Object.assign(exports, assert);

const prop = require('./core.util.prop.js');
Object.assign(exports, prop);

const convert = require('./core.util.convert.js');
Object.assign(exports, convert);

const helper = require('./core.util.helper.js');
Object.assign(exports, helper);

const timestamp = require('./core.util.timestamp.js');
Object.assign(exports, timestamp);

const time = require('./core.util.time.js');
Object.assign(exports, time);

const logger = require('./core.util.logger.js');
Object.assign(exports, logger);

module.exports = Object.freeze({
    ...constants,
    ...is,
    ...valid,
    ...assert,
    ...prop,
    ...convert,
    ...helper,
    ...timestamp,
    ...time,
    ...logger
});

exports.logText('Hello World!');
exports.logError(new TypeError('this is a test'));
exports.logWarning('Hello World!');
console.log({test: 'Test'});
