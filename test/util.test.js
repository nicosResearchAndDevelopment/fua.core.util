const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    _                = require('../src/core.util.js');

describe('core.util', function () {

    test('Assert', function () {
        expect(typeof _.Assert).toBe('function');
        const assert = new _.Assert('test');
        expect(typeof assert).toBe('function');
        expect(assert).toThrow(Error);
    });

    test('hideProp', function () {
        expect(typeof _.hideProp).toBe('function');
        const test = {test: 123, test2: 345};
        _.hideProp(test, 'test');
        expect(Object.keys(test)).toContain('test2');
        expect(Object.keys(test)).not.toContain('test');
    });

    test('isString', function () {
        expect(typeof _.isString).toBe('function');
        expect(_.isString('test')).toBeTruthy();
        expect(_.isString(null)).toBeFalsy();
        expect(_.isString(123)).toBeFalsy();
        expect(_.isString(String('test'))).toBeTruthy();
    });

    test('StringValidator', function () {
        expect(typeof _.StringValidator).toBe('function');
        const stringValidator = new _.StringValidator(/^test$/);
        expect(typeof stringValidator).toBe('function');
        expect(stringValidator('test')).toBeTruthy();
        expect(stringValidator(123)).toBeFalsy();
        expect(stringValidator('test123')).toBeFalsy();
    });

});