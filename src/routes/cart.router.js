import { Router } from "express";

import cartController from "../controllers/cart.controller.js";

const router = Router();

router.get('/:cid', cartController.getByIdPopulate);
router.post('/:cid', cartController.addProduct);
router.delete('/:cid/remove/:pid', cartController.removeProduct);
router.delete('/:cid', cartController.emptyCart);

export default router;