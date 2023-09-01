import express from 'express';
import authenticateToken from '../validation/authToken.middleware.js';
import checkUserRole from '../validation/checkUserRole.middleware.js';
import controllerGame from '../controllers/game.controller.js';

const router = express.Router();

router.route('/')
    .get(controllerGame.getAllGames);

router.route('/game')
    .post([authenticateToken, checkUserRole.isDeveloper], controllerGame.createGame);

router.route('/game/:id_game')
    .get(controllerGame.getOneGame)
    .patch([authenticateToken, checkUserRole.isDeveloper], controllerGame.updateGame)
    .delete([authenticateToken, checkUserRole.isDeveloper], controllerGame.deleteGame);

export default router;
