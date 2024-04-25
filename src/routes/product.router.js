import { Router } from "express";

import productController from "../controllers/product.controller.js";
import {authToken, adminUser} from "../middlewares/auth.middleware.js";
import utils from "../utils.js";

const router = Router();

router.get('/', productController.getAll);
router.get('/prods', productController.getAllLimit);
router.get('/:pid', productController.getById);
router.get('/category/:category', productController.getByCategory);
router.get('/subcategory/:subcategory', productController.getBySubCategory);
router.post('/', authToken, adminUser, utils.upload.array('files'), productController.create);
router.put('/:pid', authToken, adminUser, productController.update);
router.put('/image/:pid', authToken, adminUser, utils.upload.single('file'), productController.updateImage);
router.delete('/:pid', authToken, adminUser, productController.remove);

export default router;