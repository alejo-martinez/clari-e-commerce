import { Preference, Payment } from "mercadopago";

import { MercadoPagoManager } from "../dao/service/mp.service.js";
import { CartManager } from '../dao/service/cart.service.js';
import { TicketManager } from '../dao/service/ticket.service.js';
import { ProductManager } from '../dao/service/product.service.js';
import { UserManager } from '../dao/service/user.service.js';
import { NodemailerManager } from "../dao/service/nodemailer.service.js";
import { PdfManager } from "../dao/service/pdf.service.js";

import { TicketDTO } from '../dto/ticketDTO.js';
import utils from "../utils.js";
import { payment, preference } from "../config/mercadopago.config.js";



const createPreference = async (req, res, next) => {

    try {
        const user = req.user;
        const arrayProducts = [];

        const cart = await CartManager.getByIdPopulate(user.cart);
        cart.products.forEach(product => {
            // const colorFinded = product.product.variants.find(it => it.color === product.variant.color);
            // console.log(colorFinded)
            // const sizeFinded = colorFinded.sizes.find(item => item.size === product.size);
            let prod = { 'id': `${product.product._id}`, 'title': `${product.product.title}`, 'description': `${product.product.description}`, 'currency_id': 'ARS', 'unit_price': Number(product.unitPrice), 'quantity': Number(product.quantity) }
            arrayProducts.push(prod);
        });
        const date = utils.weekDate();

        const body = MercadoPagoManager.createPreference(arrayProducts, { 'name': `${user.name}`, 'surname': `${user.last_name}`, 'email': `${user.email}` }, req.user.cart);

        const response = await preference.create({ body });
        await preference.update({ id: response.id, updatePreferenceRequest: { external_reference: response.id } })
        return res.status(200).send({ status: 'succes', payload: response.id });
    } catch (error) {
        next(error);
    }
}

const paymentStatus = async (req, res, next) => {
    try {
        const body = req.body;
        if (body.data) {
            let quantity = 0;
            const pago = await payment.get({ id: body.data.id });
            const preferencia = await preference.get({ preferenceId: pago.external_reference })

            if (pago.status === 'approved') {
                const arrayItems = [];
                const user = await UserManager.getByField('email', preferencia.payer.email);
                pago.additional_info.items.forEach(item =>{
                    quantity += Number(item.quantity);
                    arrayItems.push({product: item.id, quantity: item.quantity});
                });
                const date = new Date();
                const ticket = new TicketDTO(arrayItems, quantity, pago.transaction_amount, user._id, pago.payment_method.type, body.data.id, 'Pagado', date);

                const newTicket = await TicketManager.create(ticket);

                for (const prod of ticket.products) {
                    const product = await ProductManager.getById(prod.product);
                    const newStock = product.stock - Number(prod.quantity);
                    await CartManager.removeProduct(prod.product, prod.quantity, user.cart);
                    await ProductManager.update('stock', newStock, prod.product);
                }
                const pdfDoc = await PdfManager.createPdfOrder(newTicket)
                await NodemailerManager.sendEmailTicket(user, newTicket, pdfDoc);
            }
        }
        return res.status(200).send('OK');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export default { createPreference, paymentStatus };