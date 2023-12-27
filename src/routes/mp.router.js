import { Router } from "express";

import mpController from "../controllers/mp.controller.js";
import {authToken} from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authToken, mpController.createPreference);
router.post('/createticket', mpController.paymentStatus);

export default router;