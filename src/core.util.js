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

module.exports = Object.freeze({
    ...constants,
    ...is,
    ...valid,
    ...assert,
    ...prop,
    ...convert,
    ...helper
});
