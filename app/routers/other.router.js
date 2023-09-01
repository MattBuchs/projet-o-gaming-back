import express from 'express';
import authenticateToken from '../validation/authToken.middleware.js';
import controllerAuth from '../controllers/auth.controller.js';
import controllerUser from '../controllers/user.controller.js';

const router = express.Router();

router.route('/signup')
    .post(controllerAuth.postSignup);

router.route('/login')
    .post(controllerAuth.postLogin);

router.get('/test', authenticateToken, (req, res) => {
    res.json({ message: 'Token authenticated' });
});

export default router;
