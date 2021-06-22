class Payment {
    constructor() {
    }

    getNextMonthCode() {
        return 'next_month';
    }

    getNextDrawCode() {
        return 'next_draw';
    }

    calculateDrawEntryForPayment(amount, quantityOfTickets) {
        const ticketPrice = parseFloat(amount) / parseInt(quantityOfTickets);
        console.log(ticketPrice);
        switch (ticketPrice) {
            case 8.67:
            case 8.00:
                return this.getNextMonthCode();
            case 2.00:
                return this.getNextDrawCode();
        }

        throw 'Unable to detect how we enter the entrant into draws for a payment of ' + amount + ' with ' + quantityOfTickets + ' tickets';
    }
}

module.exports = Payment;
