const constants = require('./core.util.constants.js');
Object.assign(exports, constants);

const is = require('./core.util.is.js');
Object.assign(exports, is);

const errors = require('./core.util.errors.js');
Object.assign(exports, errors);

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

const time = require('./core.util.time.js');
Object.assign(exports, time);

const logger = require('./core.util.logger.js');
Object.assign(exports, logger);

module.exports = Object.freeze({
    ...constants,
    ...is,
    ...errors,
    ...valid,
    ...assert,
    ...prop,
    ...convert,
    ...helper,
    ...time,
    ...logger
});
