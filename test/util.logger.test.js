const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    util             = require('../src/core.util.js');

describe('core.util.logger', function () {

    test('logObject', function () {
        util.logObject('Hello World!');
        util.logObject({
            test:   'Hello World!',
            answer: 42,
            true:   true
        });
    });

    test('logTodo', function () {
        util.logTodo('Hello World!');
        // console.log(new Error('test'));
        util.logTodo('Lorem Ipsum');
    });

    test('logRequest/logResponse', async function () {
        const
            http   = require('http'),
            server = http.createServer(function (request, response) {
                util.logRequest(request);
                response.write('Hello World!');
                response.end();
            }),
            PORT   = 9090;

        await new Promise((resolve) => {
            server.listen(PORT, function () {
                const request = http.request({
                    hostname: 'localhost',
                    port:     PORT,
                    path:     '/test',
                    method:   'POST'
                }, function (response) {
                    util.logResponse(response);
                    resolve();
                });
                request.write('Lorem Ipsum');
                request.end();
            });
        });

        await new Promise(resolve => server.close(resolve));

    });

});
