import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'products';

const schema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    imagesUrl:{type:[String]},
    variants:{type:[
        {color: {type: String, default: null},
        sizes:[
            {size: String, stock: Number, price: Number}
        ]}
    ]},
    category:{type: String},
    totalStock:{type: Number}
})

schema.plugin(mongoosePaginate);

export const productModel = mongoose.model(collection, schema);