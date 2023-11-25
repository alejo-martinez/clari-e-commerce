import { Router } from "express";

import mpController from "../controllers/mp.controller.js";
import {authToken} from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authToken, mpController.createPreference);

export default router;