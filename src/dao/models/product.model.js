import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'products';

const CategoryEnum = ["velas", "flores", "articulos", "mantas"];
const SubCategoryEnum = ["decorativas", "eventos", "aromaticas", "molde", "secas", "textiles", "sillones", "mesa", "individual", "hornillos", "fuentes", "figuras"];

const schema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    price:{type:Number, required:true},
    imageUrl:{type:String},
    stock:{type:Number},
    category:{type: String, required: true, enum:CategoryEnum},
    subCategory:{type:String, required: true, enum:SubCategoryEnum},
    key: String
})

schema.plugin(mongoosePaginate);

export const productModel = mongoose.model(collection, schema);