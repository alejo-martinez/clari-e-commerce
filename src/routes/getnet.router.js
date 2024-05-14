import { Router } from "express";
import getnetController from "../controllers/getnet.controller.js";

const router = Router();

router.post('/token', getnetController.getToken);
router.post('/payment', getnetController.initPayment);

export default router;