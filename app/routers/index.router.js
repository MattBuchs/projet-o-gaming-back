import express from 'express';
import controllerAuth from '../controllers/auth.controller.js';
import controllerCreateGame from '../controllers/createGame.controller.js';
import authenticateToken from '../validation/authToken.middleware.js';
import checkUserRole from '../validation/checkUserRole.middleware.js';

const router = express.Router();

router.route('/signup')
    .post(controllerAuth.postSignup);

router.route('/login')
    .post(controllerAuth.postLogin);

router.get('/test', authenticateToken, (req, res) => {
    res.json({ message: 'Hello World' });
});

router.route('/games/game')
    .post([authenticateToken, checkUserRole.isDeveloper], controllerCreateGame.createGame);

export default router;
