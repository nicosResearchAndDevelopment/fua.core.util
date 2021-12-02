const
    {test}           = require('mocha'),
    expect           = require('expect'),
    DoublyLinkedList = require('./DoublyLinkedList.js');

test('DoublyLinkedList', async function () {
    const list = new DoublyLinkedList();
    expect(list.length).toBe(0);

    expect(list.push('a')).toBe(1);
    expect(list.push(1)).toBe(2);
    expect(list.push({a: 1})).toBe(3);
    expect(list.length).toBe(3);
    expect(list.toJSON()).toMatchObject(['a', 1, {a: 1}]);

    expect(list.insert(1, 2)).toBe(4);
    expect(list.remove(2)).toBe(3);
    expect(list.pop()).toMatchObject({a: 1});
    expect(list.shift()).toBe('a');
    expect(list.insert(0, 'b')).toBe(2);
    expect(list.toJSON()).toMatchObject(['b', 2]);

    expect(list.unshift('abc')).toBe(3);
    expect(list.remove(1)).toBe(2);
    expect(list.pop()).toBe(2);
    expect(list.length).toBe(1);
    expect(list.toJSON()).toMatchObject(['abc']);

    expect(list.pop()).toBe('abc');
    expect(list.pop()).toBe(undefined);
    expect(list.push('abc')).toBe(1);
    expect(list.shift()).toBe('abc');
    expect(list.length).toBe(0);

    expect(list.insert(1, 'a')).toBe(1);
    expect(list.insert(1, 'b')).toBe(2);
    expect(list.insert(1, 'c')).toBe(3);
    expect(list.toJSON()).toMatchObject(['a', 'c', 'b']);
    expect(Array.from(list)).toMatchObject(['a', 'c', 'b']);
});
