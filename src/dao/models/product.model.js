import mongoose from 'mongoose';

const collection = 'products';

const CategoryEnum = ["velas", "flores", "articulos", "mantas"];
const SubCategoryEnum = ["decorativas", "eventos", "aromaticas", "molde", "secas", "textiles", "sillones", "mesa", "individual", "hornillos", "fuentes", "figuras"];
// const SubCategoryEnum = {
//     velas: ["subcategoria1", "subcategoria2", "subcategoria3"],
//     flores: ["subcategoria4", "subcategoria5", "subcategoria6"],
//     articulos: ["subcategoria7", "subcategoria8", "subcategoria9"],
//     mantas: ["subcategoria10", "subcategoria11", "subcategoria12"]
// };

const schema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    price:{type:Number, required:true},
    imageUrl:{type:String},
    stock:{type:Number},
    category:{type: String, required: true, enum:CategoryEnum},
    subCategory:{type:String, required: true, enum:SubCategoryEnum}
})

export const productModel = mongoose.model(collection, schema);