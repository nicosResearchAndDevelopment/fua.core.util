class Ticket {

    // TODO

} // Ticket

class TicketRequest {

    #promise;
    #resolve;
    #reject;
    #timeout;

    constructor() {
        this.#promise = new Promise((resolve, reject) => {
            this.#resolve = resolve;
            this.#reject  = reject;
        });
    } // TicketRequest#constructor

    resolve() {
        if (this.#timeout) clearTimeout(this.#timeout);
        this.#resolve(new Ticket());
    } // TicketRequest#resolve

    reject(err) {
        if (this.#timeout) clearTimeout(this.#timeout);
        this.#reject(err);
    } // TicketRequest#reject

    setTimeout() {
        // TODO
    } // TicketRequest#reject

    // TODO

} // TicketRequest

class TicketQueue {

    #activeTicket = null;
    #ticketQueue  = [];

    async requestTicket() {
        // TODO
    } // TicketQueue#requestTicket

    // TODO

} // TicketQueue

module.exports = TicketQueue;
