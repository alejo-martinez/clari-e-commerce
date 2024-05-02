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
        if(!resp) throw new CustomError('Conflict error', 'No hay stock suficiente', 6);
        return res.status(200).send({status:'succes', message:'Producto agregado !'});
    } catch (error) {
        next(error);
    }
};

const removeProduct = async(req, res, next)=>{
    try {
        const {cid, pid} = req.params;
        if(!pid || !cid) throw new CustomError('Invalid data', 'Invalid ID', 1);
        const {quantity} = req.body;
        if(!quantity) throw new CustomError('Invalid data', 'Especifica una cantidad', 2);
        await CartManager.removeProduct(pid, quantity, cid);
        return res.status(200).send({status:'succes', message:'Producto removido !'});
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
        return res.status(200).send({status:'succes', payload:cart});
    } catch (error) {
        return error;
    }
}

export default {addProduct, removeProduct, emptyCart, endPurchase, getByIdPopulate};