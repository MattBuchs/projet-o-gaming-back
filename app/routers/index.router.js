import express from 'express';
import controllerAuth from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/signup')
    .post(controllerAuth.postSignup);

router.route('/login')
    .post(controllerAuth.postLogin);

export default router;
