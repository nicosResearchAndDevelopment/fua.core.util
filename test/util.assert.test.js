const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    _                = require('../src/core.util.js');

describe('core.util.assert', function () {

    test('Assert', function () {
        expect(typeof _.Assert).toBe('function');
        const assert = new _.Assert('test');
        expect(typeof assert).toBe('function');
        expect(assert).toThrow(Error);
    });

});
