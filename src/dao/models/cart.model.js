import mongoose from "mongoose";

const collection = 'carts';

const schema = new mongoose.Schema({
    products:{type: [
        {product: {type: mongoose.Schema.Types.ObjectId, ref:'products'},
        variant:{color: String, size: String},
        quantity: Number,
        unitPrice: Number}
    ], default:[]}
});

export const cartModel = mongoose.model(collection, schema);