import mongoose from 'mongoose';

const collection = 'tickets';

const schema = new mongoose.Schema({
    products: {type:[{product:{type: mongoose.Schema.Types.ObjectId, ref: 'products'}, quantity: Number, unitPrice: Number, variant:{size: String, color: String}}]},
    quantity: {type: Number},
    amount: {type: Number},
    owner: {
        name:{type: String},
        last_name: {type: String},
        email: {type: String}
    },
    payment_method: {type: String},
    payment_id: {type: String},
    created_at: {type: Date},
    status: String,
});

export const ticketModel = mongoose.model(collection, schema);