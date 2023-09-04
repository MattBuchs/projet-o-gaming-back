import express from 'express';
import authenticateToken from '../validation/authToken.middleware.js';
import controllerUser from '../controllers/user.controller.js';

const router = express.Router();

router.route('/')
    .get(controllerUser.getAllUsers);

router.route('/:id_user')
    .get(controllerUser.getOneUser)
    .patch(authenticateToken, controllerUser.updateUser);

export default router;
