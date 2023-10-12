import express from 'express';
import authenticateToken from '../validation/authToken.middleware.js';
import checkUserRole from '../validation/checkUserRole.middleware.js';
import controllerGame from '../controllers/game.controller.js';
import controllerIssue from '../controllers/issue.controller.js';
import controllerSuggestion from '../controllers/suggestion.controller.js';
import controllerUtils from '../controllers/utils.controller.js';
import cleanScriptTagsMiddleware from '../validation/checkInjectionXSS.middleware.js';

const router = express.Router();

router.route('/')
    /**
     * GET /games
     * @summary Get all games
     * @tags Games
     * @return {Array.<Game>} 200 - Array of games
     * @return {Error}  404 - Games not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerGame.getAllGames);

router.route('/game')
    /**
     * POST /games/game
     * @summary Create a new game
     * @tags Games
     * @param {CreateGameObject} request.body.required - Game info
     * @security BearerAuth
     * @return {boolean} 200 - Game created
     * @return {Error}  400 - Bad request
     * @return {Error}  401 - Unauthorized
     * @return {Error}  500 - Internal server error
     * @description
     * To authenticate, include the JWT token in the "Authorization" header as follows:
     * - Type: Bearer
     * - Token: Your-JWT-Token-Here
     *
     * Note: To create a game, you need to be a developer.
     */
    .post(
        [authenticateToken,
            checkUserRole.isDeveloper,
            cleanScriptTagsMiddleware],
        controllerGame.createGame,
    );

router.route('/game/:id_game')
    /**
     * GET /games/game/{id_game}
     * @summary Get a game
     * @tags Games
     * @param {integer} id_game.path.required - Game id
     * @return {Game} 200 - Game
     * @return {Error}  404 - Game not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerGame.getOneGame)
    /**
     * PATCH /games/game/{id_game}
     * @summary Update a game
     * @tags Games
     * @param {integer} id_game.path.required - Game id
     * @param {UpdateGameObject} request.body.required - Game info
     * @security BearerAuth
     * @return {boolean} 200 - Game updated
     * @return {Error}  400 - Bad request
     * @return {Error}  401 - Unauthorized
     * @return {Error}  404 - Game not found
     * @return {Error}  500 - Internal server error
     * @description To authenticate, include the JWT token in the "Authorization" header as follows:
     * - Type: Bearer
     * - Token: Your-JWT-Token-Here
     *
     * Note: To update a game, you need to be a developer.
     */
    .patch(
        [authenticateToken,
            checkUserRole.isDeveloper,
            cleanScriptTagsMiddleware],
        controllerGame.updateGame,
    )
    /**
     * DELETE /games/game/{id_game}
     * @summary Delete a game
     * @tags Games
     * @param {integer} id_game.path.required - Game id
     * @security BearerAuth
     * @return {boolean} 200 - Game deleted
     * @return {Error}  400 - Bad request
     * @return {Error}  401 - Unauthorized
     * @return {Error}  404 - Game not found
     * @return {Error}  500 - Internal server error
     * @description To authenticate, include the JWT token in the "Authorization" header as follows:
     * - Type: Bearer
     * - Token: Your-JWT-Token-Here
     *
     * Note: To delete a game, you need to be a developer.
     */
    .delete([authenticateToken, checkUserRole.isDeveloper], controllerGame.deleteGame);

/* Game's Issues */
router.route('/game/:id_game/issues')
    /**
     * GET /games/game/{id_game}/issues
     * @summary Get all issues from a game
     * @tags Issues
     * @param {integer} id_game.path.required - Game id
     * @return {Array.<Issue>} 200 - Array of issues
     * @return {Error}  404 - Game not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerIssue.getAllIssues)
    /**
     * POST /games/game/{id_game}/issues
     * @summary Create a new issue
     * @tags Issues
     * @param {integer} id_game.path.required - Game id
     * @param {CreateIssueObject} request.body.required - Issue info
     * @security BearerAuth
     * @return {boolean} 200 - Issue created
     * @return {Error}  400 - Bad request
     * @return {Error}  401 - Unauthorized
     * @return {Error}  404 - Game not found
     * @return {Error}  500 - Internal server error
     * @description To authenticate, include the JWT token in the "Authorization" header as follows:
     * - Type: Bearer
     * - Token: Your-JWT-Token-Here
     */
    .post([authenticateToken, cleanScriptTagsMiddleware], controllerIssue.createIssue);

/* Game's Suggestions */
router.route('/game/:id_game/suggestions')
    /**
     * GET /games/game/{id_game}/suggestions
     * @summary Get all suggestions from a game
     * @tags Suggestions
     * @param {integer} id_game.path.required - Game id
     * @return {Array.<Suggestion>} 200 - Array of suggestions
     * @return {Error}  404 - Game not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerSuggestion.getAllSuggestions)
    /**
     * POST /games/game/{id_game}/suggestions
     * @summary Create a new suggestion
     * @tags Suggestions
     * @param {integer} id_game.path.required - Game id
     * @param {CreateSuggestionObject} request.body.required - Suggestion info
     * @security BearerAuth
     * @return {boolean} 200 - Suggestion created
     * @return {Error}  400 - Bad request
     * @return {Error}  401 - Unauthorized
     * @return {Error}  404 - Game not found
     * @return {Error}  500 - Internal server error
     * @description To authenticate, include the JWT token in the "Authorization" header as follows:
     * - Type: Bearer
     * - Token: Your-JWT-Token-Here
     */
    .post([authenticateToken, cleanScriptTagsMiddleware], controllerSuggestion.createSuggestion);

/* Game's Tags */
router.route('/game/:id_game/tags')
    /**
     * GET /games/game/{id_game}/tags
     * @summary Get all tags from a game
     * @tags Utils
     * @param {integer} id_game.path.required - Game id
     * @return {Array.<Tags>} 200 - Array of tags of a game
     * @return {Error}  404 - Game not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerUtils.getTagsFromGame);

export default router;
