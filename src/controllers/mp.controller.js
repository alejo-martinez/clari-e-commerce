import { Preference } from "mercadopago";

import { MercadoPagoManager } from "../dao/service/mp.service.js";
import {CartManager} from '../dao/service/cart.service.js';
import { ItemDTO } from "../dto/preferenceItemDTO.js";
import utils from "../utils.js";
import config from "../config/config.js";
import { client } from "../config/mercadopago.config.js";


const createPreference = async(req, res, next)=>{

    try {
        const user = req.user;
        const arrayProducts = [];

        const cart = await CartManager.getByIdPopulate(user.cart);

        cart.products.forEach(product =>{

            let prod = {'id': `${product.product._id}`, 'title': `${product.product.title}`,  'description': `${product.product.description}`, 'currency_id': 'ARS', 'unit_price': Number(product.product.price), 'quantity': Number(product.quantity)}
            arrayProducts.push(prod);
        })
        const date = utils.weekDate();
        const preference = new Preference(client);
        const body = MercadoPagoManager.createPreference(arrayProducts, {'name': `${user.name}`, 'surname': `${user.last_name}`, 'email': `${user.email}`});
      
        const response = await preference.create({body});
        
        return res.status(200).send({status:'succes', payload: response.id});
    } catch (error) {
        next(error);
    }
}

export default {createPreference};