// import { TicketManager } from "../dao/service/ticket.service.js";
// import { TicketDTO } from "../dto/ticketDTO.js";
// import CustomError from "../errors/custom.error.js";

// const getTickets = async(req, res, next)=>{
//     try {
//         const tickets = await TicketManager.getTickets();
//         return res.status(200).send({status:'succes', payload: tickets});
//     } catch (error) {
//         next(error);
//     }
// }

// const getTicketById = async(req, res, next)=>{
//     try {
//         const {tid} = req.params;
//         const ticket = await TicketManager.getTicketById(tid);
//         if(!ticket) throw new CustomError('No data', 'No existe el producto', 4);
//         return res.status(200).send({status:'succes', payload: ticket});
//     } catch (error) {
//         next(error);
//     }
// }

// const createTicket = async(req, res, next)=>{
//     try {
//         const {products, quantity, amount, paymentMethod} = req.body;
//         const ticket = new TicketDTO(products, quantity, amount, req.user._id, paymentMethod);
//         await TicketManager.create(ticket);
//         return res.status(200).send({status:'succes', message: 'Ticket creado!'});
//     } catch (error) {
//         next(error);
//     }
// }

// const deleteTicket = async(req, res, next)=>{
//     try {
//         const {tid} = req.params;
//         await TicketManager.deleteTicket(tid);
//         return res.status(200).send({status:'succes', message: 'Ticket borrado!'});
//     } catch (error) {
//         next(error);
//     }
// }

// export default {getTickets, getTicketById, createTicket, deleteTicket};