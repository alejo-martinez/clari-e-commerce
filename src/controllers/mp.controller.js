// import { Preference } from "mercadopago";

import mercadopago from "mercadopago";

import { MercadoPagoManager } from "../dao/service/mp.service.js";
import {CartManager} from '../dao/service/cart.service.js';
import { ItemDTO } from "../dto/preferenceItemDTO.js";
import utils from "../utils.js";
import { client } from "../config/mercadopago.config.js";

const createPreference = async(req, res)=>{
    console.log('entro');
    try {
        const user = req.user;
        const arrayProducts = [];

        const cart = await CartManager.getByIdPopulate(user.cart);

        cart.products.forEach(product =>{

            let prod = {id:product.product._id, title: product.product.title,  description: product.product.description, category_id: product.product.subCategory, unit_price:product.product.price, quantity: product.quantity}
            arrayProducts.push(prod);
        })
        const date = utils.weekDate();
        // const preference = new Preference(client);
        const preferenceCreated = MercadoPagoManager.createPreference(arrayProducts, user, utils.actualDate, date);
        
        // const response = await preference.create(preferenceCreated);

        const response = await mercadopago.preferences.create(preferenceCreated);
        
        return res.status(200).send({status:'succes', message: response.body.id});
    } catch (error) {
        console.log(error);
        return res.status(500).send({status:'error', message:error});
    }
}

export default {createPreference};