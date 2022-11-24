const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    _                = require('../src/core.util.js');

describe('core.util.is', function () {

    test('isString', function () {
        expect(typeof _.isString).toBe('function');
        expect(_.isString('test')).toBeTruthy();
        expect(_.isString(null)).toBeFalsy();
        expect(_.isString(123)).toBeFalsy();
        expect(_.isString(String('test'))).toBeTruthy();
    });

});
