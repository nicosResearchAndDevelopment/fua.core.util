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

    test('promify & promisify', async function () {

        const
            testObj = {msg: 'Hello World!'},
            testFn  = function (arg0, arg1, cb) {
                setTimeout(() => {
                    try {
                        if (this?.msg) {
                            cb(null, this.msg);
                        } else {
                            const res = arg0 + arg1;
                            cb(null, res);
                        }
                    } catch (err) {
                        cb(err);
                    }
                }, 20);
            }

        expect(await _.promify(testFn, 1, 2)).toBe(3);
        expect(await _.promify(testFn, '1', '2')).toBe('12');
        expect(await _.promify(testFn, '1', '2')).toBe('12');
        expect(await _.promify.call(testObj, testFn, '1', '2')).toBe('Hello World!');

        const testWrap = _.promisify(testFn);

        expect(await testWrap(1, 2)).toBe(3);
        expect(await testWrap('1', '2')).toBe('12');
        expect(await testWrap('1', '2')).toBe('12');
        expect(await testWrap.call(testObj, '1', '2')).toBe('Hello World!');

    });

    test('validate', function () {
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

    test('extractType', function () {
        console.log(_.extractType({test: ['hello', 123], lorem: 'ipsum', bool: true}));
        console.log(_.extractType(new Set([123, 'hello', Symbol.hasInstance, 2n])));
        console.log(_.extractType(new Map([['test', 123], ['hello', [1, 2, 3, 4]]])));
    });

    test('createErrorClass', function () {
        const ErrClass = _.createErrorClass('TestError');
        console.log(new ErrClass('test'));
        console.log(new ErrClass('test').toString());
    });

});
