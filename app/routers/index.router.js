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

router.route('/')
    .get(controllerUtils.home);

router.route('/signup')
    /**
     * POST /signup
     * @summary Create a new user
     * @tags Auth
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
     * @tags Auth
     * @param {LoginInputObject} request.body.required - User info
     * @return {Message} 200 - User created
     * @return {Error}  400 - Bad request
     * @return {Error}  409 - Conflict
     * @return {Error}  500 - Internal server error
     */
    .post(controllerAuth.postLogin);

/* Games */
router.route('/games/game')
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
    .post([authenticateToken, checkUserRole.isDeveloper], controllerGame.createGame);

router.route('/games')
    /**
     * GET /games
     * @summary Get all games
     * @tags Games
     * @return {Array.<Game>} 200 - Array of games
     * @return {Error}  404 - Games not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerGame.getAllGames);

router.route('/games/game/:id_game')
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
     * @security BearerAuth  // Ajout de la sécurité BearerAuth
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
    .patch([authenticateToken, checkUserRole.isDeveloper], controllerGame.updateGame)
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

/* Issues */
router.route('/games/game/:id_game/issues')
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
    .post(authenticateToken, controllerIssue.createIssue);

router.route('/issue/:id_issue')
    /**
     * GET /issue/{id_issue}
     * @summary Get an issue
     * @tags Issues
     * @param {integer} id_issue.path.required - Issue id
     * @return {Issue} 200 - Issue
     * @return {Error}  404 - Issue not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerIssue.getOneIssue)
    /**
     * PATCH /issue/{id_issue}
     * @summary Update an issue
     * @tags Issues
     * @param {integer} id_issue.path.required - Issue id
     * @param {UpdateIssueObject} request.body.required - Issue info
     * @security BearerAuth
     * @return {boolean} 200 - Issue updated
     * @return {Error}  400 - Bad request
     * @return {Error}  401 - Unauthorized
     * @return {Error}  404 - Issue not found
     * @return {Error}  500 - Internal server error
     * @description To authenticate, include the JWT token in the "Authorization" header as follows:
     * - Type: Bearer
     * - Token: Your-JWT-Token-Here
     *
     * Note: To update an issue, you need to be a developer or author.
     */
    .patch(authenticateToken, controllerIssue.updateIssue)
    /**
     * DELETE /issue/{id_issue}
     * @summary Delete an issue
     * @tags Issues
     * @param {integer} id_issue.path.required - Issue id
     * @security BearerAuth
     * @return {boolean} 200 - Issue deleted
     * @return {Error}  400 - Bad request
     * @return {Error}  401 - Unauthorized
     * @return {Error}  404 - Issue not found
     * @return {Error}  500 - Internal server error
     * @description To authenticate, include the JWT token in the "Authorization" header as follows:
     * - Type: Bearer
     * - Token: Your-JWT-Token-Here
     *
     * Note: To delete an issue, you need to be a author.
     */
    .delete(authenticateToken, controllerIssue.deleteIssue);

/* Suggestions */
router.route('/games/game/:id_game/suggestions')
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
    .post(authenticateToken, controllerSuggestion.createSuggestion);

router.route('/suggestion/:id_suggestion')
    /**
     * GET /suggestion/{id_suggestion}
     * @summary Get a suggestion
     * @tags Suggestions
     * @param {integer} id_suggestion.path.required - Suggestion id
     * @return {Suggestion} 200 - Suggestion
     * @return {Error}  404 - Suggestion not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerSuggestion.getOneSuggestion)
    /**
     * PATCH /suggestion/{id_suggestion}
     * @summary Update a suggestion
     * @tags Suggestions
     * @param {integer} id_suggestion.path.required - Suggestion id
     * @param {UpdateSuggestionObject} request.body.required - Suggestion info
     * @security BearerAuth
     * @return {boolean} 200 - Suggestion updated
     * @return {Error}  400 - Bad request
     * @return {Error}  401 - Unauthorized
     * @return {Error}  404 - Suggestion not found
     * @return {Error}  500 - Internal server error
     * @description To authenticate, include the JWT token in the "Authorization" header as follows:
     * - Type: Bearer
     * - Token: Your-JWT-Token-Here
     *
     * Note: To update a suggestion, you need to be a developer or author.
     */
    .patch(authenticateToken, controllerSuggestion.updateSuggestion)
    /**
     * DELETE /suggestion/{id_suggestion}
     * @summary Delete a suggestion
     * @tags Suggestions
     * @param {integer} id_suggestion.path.required - Suggestion id
     * @security BearerAuth
     * @return {boolean} 200 - Suggestion deleted
     * @return {Error}  400 - Bad request
     * @return {Error}  401 - Unauthorized
     * @return {Error}  404 - Suggestion not found
     * @return {Error}  500 - Internal server error
     * @description To authenticate, include the JWT token in the "Authorization" header as follows:
     * - Type: Bearer
     * - Token: Your-JWT-Token-Here
     *
     * Note: To delete a suggestion, you need to be a author.
     */
    .delete(authenticateToken, controllerSuggestion.deleteSuggestion);

/* Categories */
router.route('/categories')
    /**
     * GET /categories
     * @summary Get all categories
     * @tags Utils
     * @return {Array.<Category>} 200 - Array of categories
     * @return {Error}  404 - Categories not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerUtils.getAllCategories);

/* Users */
router.route('/users')
    /**
     * GET /users
     * @summary Get all users
     * @tags Users
     * @return {Array.<Users>} 200 - Array of users
     * @return {Error}  404 - Users not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerUser.getAllUsers);

router.route('/user/:id_user')
    /**
     * GET /user/{id_user}
     * @summary Get a user
     * @tags Users
     * @param {integer} id_user.path.required - User id
     * @return {User} 200 - User
     * @return {Error}  404 - User not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerUser.getOneUser)
    /**
     * PATCH /user/{id_user}
     * @summary Update a user
     * @tags Users
     * @param {integer} id_user.path.required - User id
     * @param {UpdateUserObject} request.body.required - User info
     * @security BearerAuth
     * @return {boolean} 200 - User updated
     * @return {Error}  400 - Bad request
     * @return {Error}  401 - Unauthorized
     * @return {Error}  404 - User not found
     * @return {Error}  500 - Internal server error
     * @description To authenticate, include the JWT token in the "Authorization" header as follows:
     * - Type: Bearer
     * - Token: Your-JWT-Token-Here
     *
     * Note: To update a user, you need to be the user.
     */
    .patch(authenticateToken, controllerUser.updateUser);

/* Search */
router.route('/search')
    /**
     * GET /search
     * @summary Search
     * @tags Search
     * @param {string} search.query.required - Search
     * @return {Array.<Search>} 200 - Array of search
     * @return {Error}  404 - Search not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerSearch.getSearch);

/* Utils */
router.route('/platforms')
    /**
     * GET /platforms
     * @summary Get all platforms
     * @tags Utils
     * @return {Array.<Platforms>} 200 - Array of platforms
     * @return {Error}  404 - Platforms not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerUtils.getAllPlatforms);

router.route('/games/game/:id_game/tags')
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

router.route('/tags')
    /**
     * GET /tags
     * @summary Get all tags
     * @tags Utils
     * @return {Array.<Tags>} 200 - Array of tags
     * @return {Error}  404 - Tags not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerUtils.getAllTags);

export default router;
