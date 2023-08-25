import express from 'express';
import controllerAuth from '../controllers/auth.controller.js';
import controllerGame from '../controllers/game.controller.js';
import authenticateToken from '../validation/authToken.middleware.js';
import checkUserRole from '../validation/checkUserRole.middleware.js';
import controllerIssue from '../controllers/issue.controller.js';

const router = express.Router();

router.route('/signup')
    .post(controllerAuth.postSignup);

router.route('/login')
    .post(controllerAuth.postLogin);

router.get('/test', authenticateToken, (req, res) => {
    res.json({ message: 'Hello World' });
});

/* Games */
router.route('/games/game')
    .post([authenticateToken, checkUserRole.isDeveloper], controllerGame.createGame);

router.route('/games')
    .get(controllerGame.getAllGames);

router.route('/games/game/:id')
    .get(controllerGame.getOneGame);

router.route('/games/game/:id_game/issue')
    .post(controllerIssue.createIssue);

export default router;
