import mongoose from 'mongoose';

const collection = 'tickets';

const enumPayment = ['efectivo', 'debito', 'credito', 'transferencia']

const schema = new mongoose.Schema({
    products: {type: mongoose.Schema.Types.ObjectId, ref: 'products'},
    quantity: {type: Number},
    amount: {type: Number},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    payment_method: {enum: enumPayment},
    date: {type: Date}
})

export const ticketModel = mongoose.model(collection, schema);