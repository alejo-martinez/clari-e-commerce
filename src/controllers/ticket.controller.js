import config from "../config/config.js";
import { TicketManager } from "../dao/service/ticket.service.js";
import { ProductManager } from "../dao/service/product.service.js";
import { TicketDTO } from "../dto/ticketDTO.js";
import CustomError from "../errors/custom.error.js";
import utils from "../utils.js";


const getTickets = async(req, res, next)=>{
    try {
        const response = await TicketManager.getTickets();
        return res.status(200).send({status:'succes', payload: response});
    } catch (error) {
        next(error);
    }
}

const getTicketById = async(req, res, next)=>{
    try {
        const {tid} = req.params;
        const ticket = await TicketManager.getTicketById(tid);
        if(!ticket) throw new CustomError('No data', 'No existe la orden', 4);
        return res.status(200).send({status:'succes', payload: ticket});
    } catch (error) {
        next(error);
    }
}

const getTicketByPreference = async(req, res, next)=>{
    try{
        const {pid} = req.params;
        const ticket = await TicketManager.getTicketByPreferenceId(pid);
        if(ticket.owner._id != req.user._id) throw new CustomError('Sin permisos', 'No tienes permiso para ver este ticket', 3);
        if(!ticket) throw new CustomError('No data', 'No existe la orden', 4);
        return res.status(200).send({status:'success', payload:ticket});
    }catch(error){
        next(error)
    }
}

const createTicket = async(req, res, next)=>{
    try {
        const {products, quantity, amount, payment_method, status, userCookie} = req.body;
        const date = new Date();
        const ticket = new TicketDTO(products, quantity, amount, userCookie, payment_method, null, status, date);

        const newTicket = await TicketManager.create(ticket);
        await utils.transporte.sendMail({from: config.adminEmail, to: userCookie.email, subject: 'Orden de compra', text: `Hola ${userCookie.name} ! Se emitió una orden de compra para realizar en nuestro local por un total de $${amount}. Su id de compra es: ${newTicket._id}. Recordá acercarte con este id para que podamos verificar tu orden, muchas gracias!`});
        return res.status(200).send({status:'success', message: 'Orden de compra creada! Enviamos un email a su correo con la orden. Muchas gracias !'});
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const approvedTicket = async(req, res, next)=>{
    try {
        const {tid} = req.params;
        const ticket = await TicketManager.approveTicket(tid);
        // for (const prod of ticket.products) {
        //     const product = await ProductManager.getById(prod.product);
        //     const totalStock = product.totalStock;
        //     const color = product.variants.find(c => c.color === prod.variant.color);
        //     const size = color.sizes.find(s => s.size === prod.variant.size);
        //     const newTotalStock = Number(totalStock) - Number(prod.quantity);
        //     const newStock = Number(size.stock) - Number(prod.quantity);
        //     await ProductManager.update('totalStock', newTotalStock, prod.product);
        //     await ProductManager.update('stock', newStock, prod.product, color._id, size._id);
        // }
        res.status(200).send({status:'succes', message:'Orden actualizada !'});
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const updatePaymentTicket = async(req, res, next)=>{
    try {
        const {tid} = req.params;
        const {payment} = req.body;

    } catch (error) {
        next(error);
    }
}


const deleteTicket = async(req, res, next)=>{
    try {
        const {tid} = req.params;
        await TicketManager.deleteTicket(tid);
        return res.status(200).send({status:'succes', message: 'Orden borrada!'});
    } catch (error) {
        next(error);
    }
}

export default {getTickets, getTicketById, createTicket, deleteTicket, getTicketByPreference, approvedTicket};