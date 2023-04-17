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

});
