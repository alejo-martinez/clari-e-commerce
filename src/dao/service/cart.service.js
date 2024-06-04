import CustomError from "../../errors/custom.error.js";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

export class CartManager {
    static async getById(id) {
        try {
            return await cartModel.findOne({ _id: id }).lean();
        } catch (error) {
            return error;
        }
    }

    static async getByIdPopulate(id) {
            return await cartModel.findOne({ _id: id }).populate('products.product');
    }

    static async create() {
        try {
            const cart = new cartModel();
            await cart.save();
            return cart;
        } catch (error) {
            return error;
        }
    }

    static async addProduct(idProd, quantity, cid, color, size) {
        const prod = await productModel.findOne({ _id: idProd });
        const cart = await cartModel.findOne({ _id: cid });
        const prodInCart = cart.products.findIndex((item) => item.product.equals(idProd) && item.variant.color === color && item.variant.size === size);
        const variant = prod.variants.find(item => item.color === color);
        const sizeType = variant.sizes.find(item => item.size === size); 
        if(prodInCart !== -1){ //El producto se encuentra en el carrito
            const validStock = Number(quantity) + Number(cart.products[prodInCart].quantity);
            if(sizeType.stock < validStock) throw new CustomError('Sin stock', 'No hay suficiente stock', 6); //No hay stock suficiente
            else cart.products[prodInCart].quantity += quantity;
    }
        if(prodInCart === -1){ //El producto no se encuentra en el carrito
            const validStock = Number(quantity) + Number(sizeType.stock);
            if(sizeType < validStock) throw new CustomError('Sin stock', 'No hay suficiente stock', 6); // No hay suficiente stock
            else cart.products.push({product: idProd, variant:{color: color, size: size}, quantity: quantity, unitPrice: sizeType.price}); // El stock es válido y pusheo el nuevo producto
        }

        await cartModel.updateOne({ _id: cid }, { products: cart.products });
        return true;
}

    static async removeProduct(product, quantity, id, color, size) {
        const cart = await cartModel.findOne({ _id: id }).lean();
        const productoIndex = cart.products.findIndex(prod => prod.product.equals(product) && prod.variant.color === color &&  prod.variant.size === size);
        // console.log(productoIndex)
        if (productoIndex !== -1) {
            cart.products[productoIndex].quantity -= quantity;
            if (cart.products[productoIndex].quantity === 0){
                cart.products.splice(productoIndex, 1);
                await cartModel.updateOne({ _id: id }, {products: cart.products});
            }
            else await cartModel.updateOne({ _id: id }, { products: cart.products });
        }
    }

    static async emptyCart(cid) {
        try {
            await cartModel.updateOne({ _id: cid }, { $set: { 'products': [] } });
        } catch (error) {
            return error;
        }
    }

    static async endPurchase(cid) {
        try {

        } catch (error) {
            return error;
        }
    }

    static async updateCart(prods, cid){
        await cartModel.updateOne({_id: cid}, {$set: {products: prods}});
    } 
};