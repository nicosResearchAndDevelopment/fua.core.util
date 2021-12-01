const
    EventEmitter = require('events'),
    events       = {
        activate: 'activate',
        close:    'close'
    };

class Ticket {

    #ticketQueue  = null;
    #readyPromise = null;

    constructor(ticketQueue) {
        this.#ticketQueue  = ticketQueue;
        this.#readyPromise = new Promise((resolve, reject) => {
            const activate = (ticket) => {
                if (ticket !== this) return;
                this.#ticketQueue.off(events.activate, activate);
                this.#readyPromise = Promise.resolve(this);
                resolve(this);
            };
            this.#ticketQueue.on(events.activate, activate);
        });
    } // Ticket#constructor

    get ready() {
        return this.#readyPromise;
    } // Ticket#ready

    close() {
        this.#ticketQueue.emit(events.close, this);
    } // Ticket#close

} // Ticket

class TicketQueue extends EventEmitter {

    #activeTicket  = null;
    #queuedTickets = [];

    constructor() {
        super();
        this.on(events.close, (ticket) => {
            if (ticket === this.#activeTicket) {
                this.#activeTicket = this.#queuedTickets.shift() || null;
                if (this.#activeTicket) this.emit(events.activate, this.#activeTicket);
            } else {
                const index = this.#queuedTickets.indexOf(ticket);
                if (index >= 0) this.#queuedTickets.splice(index, 1);
            }
        });
    } // TicketQueue#constructor

    requestTicket() {
        const ticket = new Ticket(this);
        if (this.#activeTicket) {
            this.#queuedTickets.push(ticket);
        } else {
            this.#activeTicket = ticket;
            this.emit(events.activate, ticket);
        }
        return ticket;
    } // TicketQueue#requestTicket

} // TicketQueue

module.exports = TicketQueue;
