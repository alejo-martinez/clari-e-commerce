export class TicketDTO{
    constructor(products, quantity, amount, owner, paymentMethod, paymentId, status, date){
        this.products= products;
        this.quantity= quantity;
        this.amount = amount;
        this.owner = owner;
        this.payment_method = paymentMethod === 'credit_card'? 'Tarjeta de crédito' : paymentMethod === 'account_money'? 'Transferencia': paymentMethod === 'debit_card'? 'Tarjeta de débito' : paymentMethod === 'cash'? 'Efectivo' : paymentMethod;
        this.payment_id = paymentId;
        this.status = status;
        this.date = date;
    }
}