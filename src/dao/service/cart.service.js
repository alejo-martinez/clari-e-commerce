import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

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

    static async addProduct(idProd, quantity, cid, color, size){
        const prod = await productModel.findOne({_id: idProd});
        const cart = await cartModel.findOne({_id: cid});
        const prodInCart = cart.products.findIndex((item)=> item.product.equals(idProd));
        const variant = prod.variants.find(item => item.color === color);
        const sizeType = variant.sizes.find(item => item.size === size);
        if(prodInCart !== -1){
            // const validStock = Number(sizeType.stock) - Number(quantity);
            const validStock = Number(quantity) + Number(cart.products[prodInCart].quantity);
            if(validStock > sizeType.stock) return false;
            cart.products[prodInCart].quantity += quantity;
        }
        if(prodInCart === -1){
            cart.products.push({product: idProd, quantity:  quantity , color : color, size : size, price: sizeType.price});
        }


        await cartModel.updateOne({_id: cid}, {products: cart.products});
        return true;
    }

    static async removeProduct(product, quantity, id){
            const cart = await cartModel.findOne({_id: id}).lean();
            const productoIndex = cart.products.findIndex(prod => prod.product == product);
            if(productoIndex !== -1){
                cart.products[productoIndex].quantity -= quantity;
                if(cart.products[productoIndex].quantity === 0) await cartModel.updateOne({_id: id}, {$pull:{products: cart.products[productoIndex]}});
                else await cartModel.updateOne({_id: id}, {products: cart.products});
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