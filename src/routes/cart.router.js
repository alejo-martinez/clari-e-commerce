import { Router } from "express";

import cartController from "../controllers/cart.controller.js";

const router = Router();

router.post('/:cid', cartController.addProduct);
router.delete('/:cid/remove/:pid', cartController.removeProduct);

export default router;