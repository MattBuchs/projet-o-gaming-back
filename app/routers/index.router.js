import express from 'express';
import controllerSearch from '../controllers/search.controller.js';
import controllerIssue from '../controllers/issue.controller.js';
import controllerUtils from '../controllers/utils.controller.js';
import controllerSuggestion from '../controllers/suggestion.controller.js';
import authenticateToken from '../validation/authToken.middleware.js';
import gamesRouter from './games.router.js';
import issuesRouter from './issues.router.js';
import userRouter from './user.router.js';
import otherRouter from './other.router.js';

const router = express.Router();

// router.route('/signup')
//     .post(controllerAuth.postSignup);

// router.route('/login')
//     .post(controllerAuth.postLogin);

// router.get('/test', authenticateToken, (req, res) => {
//     res.json({ message: 'Token authenticated' });
// });

/* Games */
router.use('/games', gamesRouter);

/* Issues */
router.use('/games/game', issuesRouter);
// router.route('/games/game/:id_game/issues')
//     .get(controllerissue.getAllIssues)
//     .post(authenticateToken, controllerIssue.createIssue);

// router.route('/games/game/:id_game/issue/:id_issue')
//     .get(controllerIssue.getOneIssue)
//     .patch(authenticateToken, controllerIssue.updateIssue)
//     .delete(authenticateToken, controllerIssue.deleteIssue);

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
router.use('/users', userRouter);

/* Search */
router.route('/search')
    .get(controllerSearch.getSearch);

/* Utils */
router.route('/platforms')
    .get(controllerUtils.getAllPlatforms);

router.route('/games/game/:id_game/tags')
    .get(controllerUtils.getTagsFromGame);

export default router;
