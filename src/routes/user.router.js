import { Router } from "express";

import userController from "../controllers/user.controller.js";

const router = Router();

router.get('/:uid', userController.getById);
router.put('/update/:uid', userController.updateUser);
router.put('/reset/', userController.resetPassword);
router.put('/updatepass/:uid', userController.updatePassword);
router.delete('/delete/:uid', userController.deleteUser);

export default router;