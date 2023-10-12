import express from 'express';
import controllerSearch from '../controllers/search.controller.js';
import controllerUtils from '../controllers/utils.controller.js';
import controllerAuth from '../controllers/auth.controller.js';
// Middlewares
import passwordSecurityMiddleware from '../validation/passwordSchema.middleware.js';
import cleanScriptTagsMiddleware from '../validation/checkInjectionXSS.middleware.js';
// Routers
import gamesRouter from './games.router.js';
import issueRouter from './issues.router.js';
import suggestionRouter from './suggestions.router.js';
import userRouter from './users.router.js';

const router = express.Router();

router.route('/')
    .get(controllerUtils.home);

router.use('/games', gamesRouter);

router.use('/issue', issueRouter);

router.use('/suggestion', suggestionRouter);

router.use('/users', userRouter);

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
    .post([cleanScriptTagsMiddleware, passwordSecurityMiddleware], controllerAuth.postSignup);

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
    .post(cleanScriptTagsMiddleware, controllerAuth.postLogin);

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
