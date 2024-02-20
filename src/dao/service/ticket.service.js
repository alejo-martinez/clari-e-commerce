import { cartModel } from "../models/cart.model.js";
import { ticketModel } from "../models/ticket.model.js";
import { userModel } from "../models/user.model.js";

export class TicketManager {

    static async getTickets(){
        return await ticketModel.find().populate('owner').populate('products.product').lean();
    }

    static async getTicketById(id){
        return await ticketModel.findOne({_id: id}).populate('owner').populate('products.product').lean();
    }

    static async getTicketByPreferenceId(pid){
        return await ticketModel.findOne({payment_id: pid}).populate('products.product').populate('owner');
    }

    static async create(ticket){
        const newTicket = await ticketModel.create(ticket);
        const ticketPopulate = await ticketModel.findOne({_id: newTicket._id}).populate('owner').populate('products.product')
        return ticketPopulate;
    }

    static async approveTicket(id){
        const ticket = await ticketModel.findOneAndUpdate({_id: id}, {$set:{'status': 'Pagado'}});
        const user = await userModel.findOne({_id: ticket.owner}).lean();
        await cartModel.updateOne({_id: user.cart}, {$set:{products:[]}});
        return ticket;
    }

    static async deleteTicket(id){
        await ticketModel.deleteOne({_id: id});
    }
}