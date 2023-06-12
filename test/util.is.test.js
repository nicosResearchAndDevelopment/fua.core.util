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

    test('isNativeObject', function () {
        expect(typeof _.isNativeObject).toBe('function');
        expect(_.isNativeObject({})).toBeTruthy();
        expect(_.isNativeObject({hello: 'world', lorem: 'ipsum'})).toBeTruthy();
        expect(_.isNativeObject(JSON.parse('{}'))).toBeTruthy();

        expect(_.isNativeObject(null)).toBeFalsy();
        expect(_.isNativeObject(() => null)).toBeFalsy();
        expect(_.isNativeObject(function () {
        })).toBeFalsy();
        expect(_.isNativeObject([])).toBeFalsy();
        expect(_.isNativeObject(Buffer.alloc(0))).toBeFalsy();
        expect(_.isNativeObject(new Int32Array(0))).toBeFalsy();
        expect(_.isNativeObject(new class {
        })).toBeFalsy();

        // expect(_.isNativeObject(Object.create(null))).toBeTruthy();
        expect(_.isNativeObject(Object.create(null))).toBeFalsy();
    });

});
