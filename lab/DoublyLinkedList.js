class DoublyLinkedNode {

    constructor(value) {
        this.value = value;
        this._prev = null;
        this._next = null;
        Object.defineProperties(this, {
            _prev: {enumerable: false},
            _next: {enumerable: false}
        });
    } // DoublyLinkedNode#constructor

} // DoublyLinkedNode

class DoublyLinkedList {

    constructor() {
        this.length = 0;
        this._first = null;
        this._last  = null;
        // IDEA
        // this._current      = null;
        // this._currentIndex = null;
        Object.defineProperties(this, {
            _first: {enumerable: false},
            _last:  {enumerable: false}
            // _current: {enumerable: false}
        });
    } // DoublyLinkedList#constructor

    push(value) {
        const node = new DoublyLinkedNode(value);
        if (this._last) {
            node._prev       = this._last;
            this._last._next = node;
            this._last       = node;
        } else {
            this._first = node;
            this._last  = node;
        }
        return ++this.length;
    } // DoublyLinkedList#push

    pop() {
        const node = this._last;
        if (node) {
            if (node._prev) {
                this._last       = node._prev;
                node._prev       = null;
                this._last._next = null;
            } else {
                this._first = null;
                this._last  = null;
            }
            this.length--;
            return node.value;
        }
    } // DoublyLinkedList#pop

    unshift(value) {
        const node = new DoublyLinkedNode(value);
        if (this._first) {
            node._next        = this._first;
            this._first._prev = node;
            this._first       = node;
        } else {
            this._first = node;
            this._last  = node;
        }
        return ++this.length;
    } // DoublyLinkedList#unshift

    shift() {
        const node = this._first;
        if (node) {
            if (node._next) {
                this._first       = node._next;
                node._next        = null;
                this._first._prev = null;
            } else {
                this._first = null;
                this._last  = null;
            }
            this.length--;
            return node.value;
        }
    } // DoublyLinkedList#shift

    insert(index, value) {
        if (index <= 0) {
            return this.unshift(value);
        } else if (index > this.length - 1) {
            return this.push(value);
        } else if (index < this.length / 2) {
            let prev = this._first;
            for (let k = 0, p = index - 1; k < p; k++) {
                prev = prev._next;
            }
            const node       = new DoublyLinkedNode(value);
            node._prev       = prev;
            node._next       = prev._next;
            node._prev._next = node;
            node._next._prev = node;
            return ++this.length;
        } else {
            let next = this._last;
            for (let k = this.length - 1, p = index + 1; k > p; k--) {
                next = next._prev;
            }
            const node       = new DoublyLinkedNode(value);
            node._prev       = next._prev;
            node._next       = next;
            node._prev._next = node;
            node._next._prev = node;
            return ++this.length;
        }
    } // DoublyLinkedList#insert

    remove(index) {
        if (index <= 0) {
            this.shift();
            return this.length;
        } else if (index >= this.length - 1) {
            this.pop();
            return this.length;
        } else if (index < this.length / 2) {
            let node = this._first;
            for (let k = 0, p = index; k < p; k++) {
                node = node._next;
            }
            node._prev._next = node._next;
            node._next._prev = node._prev;
            node._prev       = null;
            node._next       = null;
            return --this.length;
        } else {
            let node = this._last;
            for (let k = this.length - 1, p = index; k > p; k--) {
                node = node._prev;
            }
            node._prev._next = node._next;
            node._next._prev = node._prev;
            node._prev       = null;
            node._next       = null;
            return --this.length;
        }
    } // DoublyLinkedList#remove

    toJSON() {
        const arr = new Array(this.length);
        let node  = this._first;
        for (let k = 0, p = this.length; k < p; k++) {
            arr[k] = node.value;
            node   = node._next;
        }
        return arr;
    } // DoublyLinkedList#toJSON

    * [Symbol.iterator]() {
        let node = this._first;
        while (node) {
            yield node.value;
            node = node._next;
        }
    } // DoublyLinkedList#[Symbol.iterator]

} // DoublyLinkedList

module.exports = DoublyLinkedList;
