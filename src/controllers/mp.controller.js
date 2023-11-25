import { Preference } from "mercadopago";

import { MercadoPagoManager } from "../dao/service/mp.service.js";
import {CartManager} from '../dao/service/cart.service.js';
import { ItemDTO } from "../dto/preferenceItemDTO.js";
import utils from "../utils.js";
import { client } from "../config/mercadopago.config.js";

const createPreference = async(req, res)=>{
    try {
        const user = req.user;
        const arrayProducts = [];

        const cart = await CartManager.getByIdPopulate(user.cart);

        cart.products.forEach(product =>{

            let prod = {id:product.product._id, title: product.product.title,  description: product.product.description, category_id: product.product.subCategory, unit_price:product.product.price, quantity: product.quantity}
            arrayProducts.push(prod);
        })
        const date = utils.weekDate();
        const preference = new Preference(client);
        const preferenceCreated = await MercadoPagoManager.createPreference(arrayProducts, user, utils.actualDate, date);
        console.log(preferenceCreated);
        const response = await preference.create(preferenceCreated);
        console.log(response);
        res.status(200).send({status:'succes', message: response.body.id});
    } catch (error) {
        console.log(error);
        res.status(500).send({status:'error', message:error});
    }
}

export default {createPreference};