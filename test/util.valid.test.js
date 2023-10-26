const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    _                = require('../src/core.util.js');

describe('core.util.valid', function () {

    test('StringValidator', function () {
        expect(typeof _.StringValidator).toBe('function');
        const stringValidator = new _.StringValidator(/^test$/);
        expect(typeof stringValidator).toBe('function');
        expect(stringValidator('test')).toBeTruthy();
        expect(stringValidator(123)).toBeFalsy();
        expect(stringValidator('test123')).toBeFalsy();
    });

    test.skip('validate', function () {
        expect(_.validate(String('test'), {
            type: 'string'
        })).toBeTruthy();
        expect(_.validate(new String('test'), {
            type: 'string'
        })).toBeFalsy();
        expect(_.validate(String('test'), {
            or: [
                {type: 'string'},
                {class: String}
            ]
        })).toBeTruthy();
        expect(_.validate(new String('test'), {
            or: [
                {type: 'string'},
                {class: String}
            ]
        })).toBeTruthy();
        expect(_.validate([], {
            xor: [
                {class: Array},
                {type: 'object'}
            ]
        })).toBeFalsy();
        expect(_.validate([], {
            and: [
                {class: Array},
                {type: 'object'}
            ]
        })).toBeTruthy();
    });

    test('objectMatches', function () {
        expect(_.objectMatches({a: 1, b: 2}, {a: 1})).toBeTruthy();
        expect(_.objectMatches({a: 1}, {a: 1, b: 2})).toBeFalsy();

        expect(_.objectMatches('Lorem Ipsum', 'Hello World!')).toBeFalsy();
        expect(_.objectMatches(true, true)).toBeTruthy();
        expect(_.objectMatches(NaN, NaN)).toBeTruthy();
        expect(_.objectMatches({test: 'test'}, {test: 'test'})).toBeTruthy();
        expect(_.objectMatches({test: 'lorem'}, {test: 'ipsum'})).toBeFalsy();
        expect(_.objectMatches({lorem: 'ipsum', hello: 'world'}, {lorem: 'ipsum'})).toBeTruthy();
        expect(_.objectMatches({lorem: 'ipsum'}, {lorem: 'ipsum', hello: 'world'})).toBeFalsy();
        expect(_.objectMatches([{test: 'test'}], [{test: 'test'}])).toBeTruthy();
        expect(_.objectMatches([1, 2], [1])).toBeFalsy();
    });

    test('objectEquals', function () {
        expect(_.objectEquals({a: 1, b: 2}, {b: 2, a: 1})).toBeTruthy();
        expect(_.objectEquals({a: 1, b: 1}, {b: 2, a: 2})).toBeFalsy();

        expect(_.objectEquals([1, 2], [1, 2])).toBeTruthy();
        expect(_.objectEquals([1, 2], [2, 1])).toBeFalsy();
        expect(_.objectEquals([{test: 'test'}], [{test: 'test'}])).toBeTruthy();
        expect(_.objectEquals(
            {test: {lorem: 'ipsum'}, hello: 'world'},
            {hello: 'world', test: {lorem: 'ipsum'}}
        )).toBeTruthy();
        expect(_.objectEquals(
            {test: {lorem: 'ipsum', hello: 'world'}},
            {test: {lorem: 'ipsum'}}
        )).toBeFalsy();
    });

});
