const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    _                = require('../src/core.util.js');

describe('core.util.prop', function () {

    test('hideProp', function () {
        expect(typeof _.hideProp).toBe('function');
        const test = {test: 123, test2: 345};
        _.hideProp(test, 'test');
        expect(Object.keys(test)).toContain('test2');
        expect(Object.keys(test)).not.toContain('test');
    });

});
