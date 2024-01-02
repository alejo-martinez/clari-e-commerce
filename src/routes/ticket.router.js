import {Router} from 'express';

import ticketController from '../controllers/ticket.controller.js';
import { authToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', ticketController.getTickets);
router.get('/:tid', ticketController.getTicketById);
router.post('/', authToken, ticketController.createTicket);
router.delete('/', ticketController.deleteTicket);

export default router;