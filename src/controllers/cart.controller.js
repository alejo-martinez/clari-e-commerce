import { CartManager } from "../dao/service/cart.service.js";
import CustomError from "../errors/custom.error.js";

const addProduct = async(req, res, next)=>{
    try {
        const {cid} = req.params;
        const {idProd, quantity} = req.body;
        await CartManager.addProduct(idProd, quantity, cid);
        return res.status(200).send({status:'succes', message:'Added !'});
    } catch (error) {
        next(error);
    }
};

const removeProduct = async(req, res, next)=>{
    try {
        const {cid, pid} = req.params;
        const {quantity} = req.body;
        await CartManager.removeProduct(pid, quantity, cid);
        return res.status(200).send({status:'succes', message:'Removed !'});
    } catch (error) {
        next(error);
    }
}

const emptyCart = async(req, res, next)=>{
    try {
        const {cid} = req.params;
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

export default {addProduct, removeProduct, emptyCart, endPurchase};