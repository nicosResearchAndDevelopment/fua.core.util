const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    _                = require('../src/core.util.js');

describe('core.util.time', function () {

    test('duration & pause', async function () {
        this.timeout(0);

        console.time('duration');
        const start = process.hrtime();

        await _.pause(1);                                   // +1s
        await _.pause('2s');                                // +2s
        await _.pause('500ms');                             // +0.5s
        const date = new Date();
        date.setSeconds(date.getSeconds() + 2);
        date.setMilliseconds(date.getMilliseconds() - 500);
        await _.pause(date);                                // +1.5s
        await _.pause({milliseconds: 2000, seconds: -1});   // +1s

        const diff = process.hrtime(start);
        console.timeEnd('duration');

        const seconds = diff[0] + diff[1] / 1e9;
        expect(seconds).toBeCloseTo(1 + 2 + 0.5 + 1.5 + 1, 0);
    });

});
