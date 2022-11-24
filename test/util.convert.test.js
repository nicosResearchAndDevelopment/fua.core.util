const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    _                = require('../src/core.util.js');

describe('core.util.convert', function () {

    test('toArray', function () {
        expect(typeof _.toArray).toBe('function');

        expect(_.toArray('Hello World!')).toMatchObject(['Hello World!']);
        expect(_.toArray(['Hello World!'])).toMatchObject(['Hello World!']);
        expect(_.toArray()).toMatchObject([]);
        expect(_.toArray(null)).toMatchObject([]);
        expect(_.toArray(0)).toMatchObject([0]);
        expect(_.toArray('')).toMatchObject(['']);
        expect(_.toArray({0: ''})).toMatchObject([{0: ''}]);
        expect(_.toArray([1, 2, 3])).toMatchObject([1, 2, 3]);

        const
            basic_iterator_fn = function* () {
                for (let index = 1, max = 3; index <= max; index++) {
                    yield index;
                }
            },
            basic_iterator    = basic_iterator_fn(),
            basic_iterable    = {
                [Symbol.iterator]: basic_iterator_fn
            };

        expect(_.toArray(basic_iterator)).toMatchObject([1, 2, 3]);
        expect(_.toArray(basic_iterable)).toMatchObject([1, 2, 3]);

        const
            custom_iterator_fn = function () {
                let index = 1, max = 3;
                return {
                    next: () => (index <= max)
                        ? {value: index++, done: false}
                        : {value: undefined, done: true}
                };
            },
            custom_iterator    = custom_iterator_fn(),
            custom_iterable    = {
                [Symbol.iterator]: custom_iterator_fn
            };

        expect(_.toArray(custom_iterator)).toMatchObject([1, 2, 3]);
        expect(_.toArray(custom_iterable)).toMatchObject([1, 2, 3]);
    });

    test('extendObject', function () {
        expect(_.extendObject({a: 1}, {b: 2})).toEqual({a: 1, b: 2});

        expect(_.extendObject({test: 'test'})).toEqual({test: 'test'});
        expect(_.extendObject({lorem: 'ipsum'}, {hello: 'world'}))
            .toEqual({lorem: 'ipsum', hello: 'world'});
        expect(_.extendObject(
            {test: {hello: 'world'}, test2: [1, 2, 3], test3: {}},
            {test: {lorem: 'ipsum'}, test2: [3, 4], test3: null}
        )).toEqual({test: {lorem: 'ipsum', hello: 'world'}, test2: [3, 4], test3: null});
    });

    test('reduceObject', function () {
        expect(_.reduceObject({a: 1, b: 2}, {b: 2})).toEqual({a: 1});

        expect(_.reduceObject(
            {test: {lorem: 'ipsum', hello: 'world'}, test2: [3, 4], test3: null},
            {test: {hello: 'world'}, test2: [1, 2, 3], test3: {}}
        )).toEqual({test: {lorem: 'ipsum'}, test2: [3, 4], test3: null});
        expect(_.reduceObject(
            {test: {lorem: 'ipsum', hello: 'world'}, test2: [3, 4], test3: null},
            {test: {lorem: 'ipsum'}, test2: [3, 4], test3: null}
        )).toEqual({test: {hello: 'world'}});
    });

});
