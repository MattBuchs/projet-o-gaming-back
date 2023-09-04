import express from 'express';
import controllerSearch from '../controllers/search.controller.js';
import controllerAuth from '../controllers/auth.controller.js';
import controllerUser from '../controllers/user.controller.js';
import controllerGame from '../controllers/game.controller.js';
import controllerIssue from '../controllers/issue.controller.js';
import controllerUtils from '../controllers/utils.controller.js';
import controllerSuggestion from '../controllers/suggestion.controller.js';
import authenticateToken from '../validation/authToken.middleware.js';
import checkUserRole from '../validation/checkUserRole.middleware.js';

const router = express.Router();

router.route('/signup')
    /**
     * POST /signup
     * @summary Create a new user
     * @param {SignupInputObject} request.body.required - User info
     * @return {boolean} 200 - User created
     * @return {Error}  400 - Bad request
     * @return {Error}  409 - Conflict
     * @return {Error}  500 - Internal server error
     */
    .post(controllerAuth.postSignup);

router.route('/login')
    /**
     * POST /login
     * @summary Login a user
     * @param {LoginInputObject} request.body.required - User info
     * @return {object} 200 - User created
     * @return {Error}  400 - Bad request
     * @return {Error}  409 - Conflict
     * @return {Error}  500 - Internal server error
     */
    .post(controllerAuth.postLogin);

router.get('/test', authenticateToken, (req, res) => {
    res.json({ message: 'Token authenticated' });
});

/* Games */
router.route('/games/game')
    .post([authenticateToken, checkUserRole.isDeveloper], controllerGame.createGame);

router.route('/games')
    .get(controllerGame.getAllGames);

router.route('/games/game/:id_game')
    .get(controllerGame.getOneGame)
    .patch([authenticateToken, checkUserRole.isDeveloper], controllerGame.updateGame)
    .delete([authenticateToken, checkUserRole.isDeveloper], controllerGame.deleteGame);

/* Issues */
router.route('/games/game/:id_game/issues')
    .get(controllerIssue.getAllIssues)
    .post(authenticateToken, controllerIssue.createIssue);

router.route('/games/game/:id_game/issue/:id_issue')
    .get(controllerIssue.getOneIssue)
    .patch(authenticateToken, controllerIssue.updateIssue)
    .delete(authenticateToken, controllerIssue.deleteIssue);

/* Suggestions */
router.route('/games/game/:id_game/suggestions')
    .get(controllerSuggestion.getAllSuggestions)
    .post(authenticateToken, controllerSuggestion.createSuggestion);

router.route('/games/game/:id_game/suggestion/:id_suggestion')
    .get(controllerSuggestion.getOneSuggestion)
    .patch(authenticateToken, controllerSuggestion.updateSuggestion)
    .delete(authenticateToken, controllerSuggestion.deleteSuggestion);

/* Categories */
router.route('/categories')
    .get(controllerUtils.getAllCategories);

/* Users */
router.route('/users')
    .get(controllerUser.getAllUsers);

router.route('/user/:id_user')
    .get(controllerUser.getOneUser)
    .patch(authenticateToken, controllerUser.updateUser);

/* Search */
router.route('/search')
    .get(controllerSearch.getSearch);

/* Utils */
router.route('/platforms')
    .get(controllerUtils.getAllPlatforms);

router.route('/games/game/:id_game/tags')
    .get(controllerUtils.getTagsFromGame);

router.route('/tags')
    .get(controllerUtils.getAllTags);

export default router;
