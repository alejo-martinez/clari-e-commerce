import { Router } from "express";

import productController from "../controllers/product.controller.js";
import {authToken, adminUser} from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', productController.getAll);
router.get('/:pid', productController.getById);
router.get('/category/:category', productController.getByCategory);
router.get('/subcategory/:subcategory', productController.getBySubCategory);
router.post('/', authToken, adminUser, productController.create);
router.put('/:pid', authToken, adminUser, productController.update);
router.delete('/:pid', authToken, adminUser, productController.remove);

export default router;