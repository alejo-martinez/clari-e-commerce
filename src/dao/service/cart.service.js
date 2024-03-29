import { cartModel } from "../models/cart.model.js";

export class CartManager {
    static async getById (id){
        try {
            return await cartModel.findOne({_id:id}).lean();
        } catch (error) {
            return error;
        }
    }

    static async getByIdPopulate(id){
        try {
            return await cartModel.findOne({_id: id}).populate('products.product');
        } catch (error) {
            return error;
        }
    }

    static async create(){
        try {
            const cart = new cartModel();
            await cart.save();
            return cart;
        } catch (error) {
            return error;
        }
    }

    static async addProduct(product, quantity, id, stock){
        try {
            if(!product || !quantity || !id) throw new Error('Faltan campos');
            const cart = await cartModel.findOne({_id:id});
            if(!cart) throw new Error('No existe el carrito');
            const producto = cart.products.find(prod => prod.product == product);
            if(!producto){
                if(stock < Number(quantity)) throw new Error('No contamos con suficiente stock, porfavor ingresa una cantidad menor.');
                await cartModel.updateOne({_id: id}, {$push:{'products':{product:product, quantity:quantity}}});
            }
            else{
                if(stock < Number(quantity) + producto.quantity) throw new Error('No contamos con suficiente stock, porfavor ingresa una cantidad menor.');
                await cartModel.updateOne({_id: id, 'products.product': product}, {$set:{'products.$.quantity':producto.quantity + quantity}});
            }
        } catch (error) {
            return {status:'error', error: error};
        }
    }

    static async removeProduct(product, quantity, id){
        try {
            const cart = await cartModel.findOne({_id: id}).lean();
            const producto = cart.products.find(prod => prod.product == product);
            if(producto.quantity == quantity) await cartModel.updateOne({_id: id}, {$pull:{products:{product: product}}});
            if(producto.quantity > quantity) await cartModel.updateOne({_id: id, 'products.product': product}, {$set:{'products.$.quantity': producto.quantity - quantity}});
        } catch (error) {
            return error;
        }
    }

    static async emptyCart(cid){
        try {
            await cartModel.updateOne({_id: cid}, {$set:{'products':[]}});
        } catch (error) {
            return error;
        }
    }

    static async endPurchase(cid){
        try {
            
        } catch (error) {
            return error;
        }
    }
};