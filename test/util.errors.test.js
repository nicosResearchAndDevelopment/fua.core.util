const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    fetch            = require('node-fetch'),
    _                = require('../src/core.util.js');

describe('core.util.errors', function () {

    describe('HTTPRequestError', function () {

        test('develop', function () {
            const {HTTPRequestError} = _;
            expect(typeof HTTPRequestError).toBe('function');
            // console.log(new HTTPRequestError());
            console.log(new HTTPRequestError(404));
        });

    });

    describe('HTTPResponseError', function () {

        test('develop', async function () {
            this.timeout(0);

            const {HTTPResponseError} = _;
            expect(typeof HTTPResponseError).toBe('function');
            // console.log(new HTTPResponseError());
            const response = await fetch('http://nicos-ag.com/nothing');
            console.log(new HTTPResponseError(response));
            // console.log(JSON.stringify(new HTTPResponseError(response), null, 2));
        });

    });

    describe('toErrorJSON/fromErrorJSON', function () {

        test('develop', function () {
            const err            = new TypeError('test1', {cause: new Error('test2', {cause: new Error('test3')})});
            err.code             = 'TEST1';
            err.cause.code       = 'TEST2';
            err.cause.cause.name = 'TypeError';
            err.cause.cause.code = 'TEST3';
            const errJSON        = _.errorToJSON(err);
            const err2           = _.errorFromJSON(errJSON);
            console.log('err', err);
            console.log('err2', err2);
        });
    });

});
