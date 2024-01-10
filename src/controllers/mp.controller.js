import mercadopago, { Preference, MerchantOrder } from "mercadopago";
import { MercadoPagoManager } from "../dao/service/mp.service.js";
import {CartManager} from '../dao/service/cart.service.js';
import utils from "../utils.js";
import { client } from "../config/mercadopago.config.js";
import config from "../config/config.js";


const createPreference = async(req, res, next)=>{

    try {
        const user = req.user;
        const arrayProducts = [];

        const cart = await CartManager.getByIdPopulate(user.cart);

        cart.products.forEach(product =>{

            let prod = {'id': `${product.product._id}`, 'title': `${product.product.title}`,  'description': `${product.product.description}`, 'currency_id': 'ARS', 'unit_price': Number(product.product.price), 'quantity': Number(product.quantity)}
            arrayProducts.push(prod);
        });
        const date = utils.weekDate();
        const preference = new Preference(client);
        const body = MercadoPagoManager.createPreference(arrayProducts, {'name': `${user.name}`, 'surname': `${user.last_name}`, 'email': `${user.email}`}, req.user.cart);
        
        const response = await preference.create({body});
        
        return res.status(200).send({status:'succes', payload: response.id});
    } catch (error) {
        next(error);
    }
}

const paymentStatus = async(req, res, next)=>{
    try {

        const topic = req.query.topic;
        const id = req.query.id;

        console.log(topic)
        console.log(id)
        console.log(req.body);
        return res.status(200).send('OK');
    } catch (error) {
        next(error);
    }
}

const paymentSucces = async(req, res, next)=>{
    try { 
        const {payment_id, collection_id, status, payment_type, collection_status} = req.query;
        const merc = new MerchantOrder({
            _id : payment_id,
            collection_id: collection_id ,
            status: status,
            type : payment_type,
            subtype : 'mercadoPago'
        })
        console.log(merc);
    } catch (error) {
        next(error);
    }
}

export default {createPreference, paymentStatus};