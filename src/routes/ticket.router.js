import {Router} from 'express';

import ticketController from '../controllers/ticket.controller.js';
import { authToken, adminUser } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authToken, adminUser, ticketController.getTickets);
router.get('/:tid', authToken, ticketController.getTicketById);
router.get('/preference/:pid', authToken, ticketController.getTicketByPreference);
router.post('/', authToken, ticketController.createTicket);
router.put('/approved/:tid', authToken, adminUser, ticketController.approvedTicket);
router.delete('/delete/:tid', ticketController.deleteTicket);

export default router;