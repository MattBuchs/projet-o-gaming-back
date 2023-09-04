import express from 'express';
import authenticateToken from '../validation/authToken.middleware.js';
import checkUserRole from '../validation/checkUserRole.middleware.js';
import controllerGame from '../controllers/game.controller.js';
import controllerIssue from '../controllers/issue.controller.js';
import controllerSuggestion from '../controllers/suggestion.controller.js';
import controllerUtils from '../controllers/utils.controller.js';

const router = express.Router();

router.route('/')
    .get(controllerGame.getAllGames);

router.route('/game')
    .post([authenticateToken, checkUserRole.isDeveloper], controllerGame.createGame);

router.route('/game/:id_game')
    .get(controllerGame.getOneGame)
    .patch([authenticateToken, checkUserRole.isDeveloper], controllerGame.updateGame)
    .delete([authenticateToken, checkUserRole.isDeveloper], controllerGame.deleteGame);

/* Game's Issues */
router.route('/game/:id_game/issues')
    .get(controllerIssue.getAllIssues)
    .post(authenticateToken, controllerIssue.createIssue);

/* Game's Suggestions */
router.route('/game/:id_game/suggestions')
    .get(controllerSuggestion.getAllSuggestions)
    .post(authenticateToken, controllerSuggestion.createSuggestion);

/* Game's Tags */
router.route('/game/:id_game/tags')
    .get(controllerUtils.getTagsFromGame);

export default router;
