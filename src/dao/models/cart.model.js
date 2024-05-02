import mongoose from "mongoose";

const collection = 'carts';

const schema = new mongoose.Schema({
    products:{type: [
        {product: {type: mongoose.Schema.Types.ObjectId, ref:'products'}, quantity: Number, size: String, color: String, price: Number}
    ], default:[]}
});

export const cartModel = mongoose.model(collection, schema);