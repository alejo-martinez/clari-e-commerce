import { CartManager } from "../dao/service/cart.service.js";
import { ProductManager } from "../dao/service/product.service.js";
import CustomError from "../errors/custom.error.js";

const addProduct = async(req, res, next)=>{
    try {
        const {cid} = req.params;
        if(!cid) throw new CustomError('Invalid data', 'Invalid ID', 1);
        const {idProd, quantity} = req.body;
        if(!idProd  && quantity) throw new CustomError('Invalid data', 'Invalid product ID', 1);
        if(!quantity && idProd) throw new CustomError('No data', 'Especifica una cantidad', 2);
        if(!quantity && !idProd) throw new CustomError('No data', 'Missing data', 6);
        const prodBdd = await ProductManager.getById(idProd);
        const resp = await CartManager.addProduct(idProd, quantity, cid, prodBdd.stock);
        if(resp && resp.status === 'error') throw new CustomError('Conflict error', resp.error.message, 6);
        return res.status(200).send({status:'succes', message:'Added !'});
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
        return res.status(200).send({status:'succes', message:'Removed !'});
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