const constants = require('./core.util.constants.js');
Object.assign(exports, constants);

// const is = require('./core.util.is.js');
// Object.assign(exports, is);
const link_is = require('./link.core.is.js');
Object.assign(exports, link_is);

const prop = require('./core.util.prop.js');
Object.assign(exports, prop);

const errors = require('./core.util.errors.js');
Object.assign(exports, errors);

const valid = require('./core.util.valid.js');
Object.assign(exports, valid);

// const assert = require('./core.util.Assert.js');
// Object.assign(exports, assert);
const link_assert = require('./link.core.assert.js');
Object.assign(exports, link_assert);

const convert = require('./core.util.convert.js');
Object.assign(exports, convert);

const helper = require('./core.util.helper.js');
Object.assign(exports, helper);

// const time = require('./core.util.time.js');
// Object.assign(exports, time);
const link_ts = require('./link.core.ts.js');
Object.assign(exports, link_ts);

// const logger = require('./core.util.logger.js');
// Object.assign(exports, logger);
const link_tty = require('./link.core.tty.js');
Object.assign(exports, link_tty);

module.exports = Object.freeze({
    ...constants,
    // ...is,
    ...link_is,
    ...prop,
    ...errors,
    ...valid,
    // ...assert,
    ...link_assert,
    ...convert,
    ...helper,
    // ...time,
    ...link_ts,
    // ...logger
    ...link_tty
});
