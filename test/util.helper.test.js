const
  { describe, test } = require('mocha'),
  expect = require('expect'),
  _ = require('../src/core.util.js');

describe('core.util.helper', function () {

  test('promify & promisify', async function () {

    const
      testObj = { msg: 'Hello World!' },
      testFn = function (arg0, arg1, cb) {
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

  // test('extractType', function () {
  //     const obj = {test: ['hello', 123], lorem: 'ipsum', bool: true};
  //     console.log(_.extractType(obj));
  //     const set = new Set([123, 'hello', Symbol.hasInstance, BigInt(2)]);
  //     console.log(_.extractType(set));
  //     const map = new Map([['test', 123], ['hello', [1, 2, 3, 4]]]);
  //     console.log(_.extractType(map));
  //     const buffer = Buffer.from('test');
  //     console.log(_.extractType(buffer));
  //     const promise = Promise.resolve(123);
  //     console.log(_.extractType(promise));
  //     const iterator = new Set([1, 2, 3, 'test']).values();
  //     console.log(_.extractType(iterator));
  // });

  test('createErrorClass', function () {
    const ErrClass = _.createErrorClass('TestError', 'ERROR_TEST');
    const err = new ErrClass('test message')
    console.log(err);
    console.log(err instanceof Error);
    console.log(err.message);
    console.log(err.code);
    console.log(err.stack);
    console.log(err.toString());
    console.log(ErrClass('test message'));
  });

});
