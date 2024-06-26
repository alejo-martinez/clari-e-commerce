import { CartManager } from "../dao/service/cart.service.js";
import { ProductManager } from "../dao/service/product.service.js";
import CustomError from "../errors/custom.error.js";

const addProduct = async(req, res, next)=>{
    try {
        const {cid} = req.params;
        if(!cid) throw new CustomError('Invalid data', 'Invalid ID', 1);
        const {idProd, quantity, size, color} = req.body;
        if(!idProd)  throw new CustomError("Missing parameter",'Parameter not found : idProd', 4);
        if(!quantity  || !size || !color ) throw new CustomError("Missing parameters","Debes completar todos los datos",4);
        const resp = await CartManager.addProduct(idProd, quantity, cid, color, size);
        if(!resp) throw new CustomError('Sin stock', 'No hay stock suficiente', 6);
        return res.status(200).send({status:'succes', message:'Producto agregado !'});
    } catch (error) {
        next(error);
    }
};

const removeProduct = async(req, res, next)=>{
    try {
        const {cid, pid} = req.params;
        if(!pid || !cid) throw new CustomError('Invalid data', 'Invalid ID', 1);
        const {quantity, color, size} = req.body;
        if(!quantity) throw new CustomError('Invalid data', 'Especifica una cantidad', 2);
        await CartManager.removeProduct(pid, quantity, cid, color, size);
        return res.status(200).send({status:'succes', message:'Producto removido !'});
    } catch (error) {
        next(error);
    }
}

const updateCart = async(req, res, next)=>{
    try {
        const {cid} = req.params;
        const {prods} = req.body;
        const carrito = await CartManager.getByIdPopulate(cid);
        // console.log(carrito.products[0].product)
        console.log(prods)
        prods.forEach(prod=>{
            // console.log(prod)
            const colorFinded = prod.variant.color;
            const sizeFinded = prod.variant.size;
            const variant = prod.product.variants.find(p => p.color === colorFinded);
            const size = variant.sizes.find(s => s.size === sizeFinded);
            const prodFinded = carrito.products.findIndex(pr => pr.product === prod)

            // const size = prods.find(p => p._id === prod.product && )
        })
        // carrito.products.conca
        // await CartManager.updateCart(prods, cid);
        return res.status(200).send({status: 'success', message: 'Updated!'});
    } catch (error) {
        next(error);
    }
}

const emptyCart = async(req, res, next)=>{
    try {
        const {cid} = req.params;
        if(!cid) throw new CustomError('Invalid data', 'Invalid ID', 1)
        await CartManager.emptyCart(cid);
        return res.status(200).send({status:'succes', message:'Carrito vaciado !'});
    } catch (error) {
        next(error);
    }
}

const endPurchase = async(req, res, next)=>{
    try {
        const {cid} = req.params;
    } catch (error) {
        next(error);
    }
}

const getByIdPopulate = async(req, res)=>{
    try {
        const {cid} = req.params;

        const cart = await CartManager.getByIdPopulate(cid);

        if(!cart) throw new CustomError('No data', 'No se encontró ningun carrito', 4);
        return res.status(200).send({status:'succes', payload:cart});
    } catch (error) {
        return error;
    }
}

export default {addProduct, removeProduct, emptyCart, endPurchase, getByIdPopulate, updateCart};