import express from 'express';
import controllerAuth from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/signup')
    .post(controllerAuth.postSignup);

export default router;
