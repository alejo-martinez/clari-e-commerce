import { ticketModel } from "../models/ticket.model.js";

export class TicketManager {

    static async getTickets(){
        return await ticketModel.find().lean();
    }

    static async getTicketById(id){
        return await ticketModel.findOne({_id: id}).lean();
    }

    static async create(ticket){
        await ticketModel.create(ticket);
    }

    static async deleteTicket(id){
        await ticketModel.deleteOne({_id: id});
    }
}