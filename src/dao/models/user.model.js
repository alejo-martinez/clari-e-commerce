import mongoose from "mongoose";

const collection = 'users';

const schema = new mongoose.Schema({
    name:{type: String, required:true},
    second_name:{type: String},
    last_name:{type: String, required:true},
    email:{type:String, unique: true, required:true},
    password:{type:String, required:true, select:false},
    rol:{type:String, default:'client'},
    cart:{type: mongoose.Schema.Types.ObjectId, ref:'carts'}
});

export const userModel = mongoose.model(collection, schema);