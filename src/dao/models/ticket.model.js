import mongoose from 'mongoose';

const collection = 'tickets';

const schema = new mongoose.Schema({
    products: {type:[{product:{type: mongoose.Schema.Types.ObjectId, ref: 'products'}, quantity: Number}]},
    quantity: {type: Number},
    amount: {type: Number},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required:true},
    payment_method: {type: String},
    payment_id: {type: String},
    created_at: {type: Date},
    status: String,
});

export const ticketModel = mongoose.model(collection, schema);