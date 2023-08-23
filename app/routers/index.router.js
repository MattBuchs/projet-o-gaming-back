import express from 'express';
import controllerAuth from '../controllers/auth.controller.js';
import authenticateToken from '../validation/authToken.middleware.js';

const router = express.Router();

router.route('/signup')
    .post(controllerAuth.postSignup);

router.route('/login')
    .post(controllerAuth.postLogin);

router.get('/test', authenticateToken, (req, res) => {
    res.json({ message: 'Hello World' });
});

router.route('/games/game')
    .post()

export default router;
