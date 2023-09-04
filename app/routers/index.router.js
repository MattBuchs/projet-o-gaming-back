import express from 'express';
import controllerSearch from '../controllers/search.controller.js';
import controllerUtils from '../controllers/utils.controller.js';
import controllerAuth from '../controllers/auth.controller.js';
// Routers
import testAuthRouter from './testAuth.router.js';
import gamesRouter from './games.router.js';
import issueRouter from './issues.router.js';
import suggestionRouter from './suggestions.router.js';
import userRouter from './users.router.js';

const router = express.Router();

router.route('/signup').post(controllerAuth.postSignup);

router.route('/login').post(controllerAuth.postLogin);

router.use('/test', testAuthRouter);

router.use('/games', gamesRouter);

router.use('/issue', issueRouter);

router.use('/suggestion', suggestionRouter);

router.use('/users', userRouter);

router.route('/categories').get(controllerUtils.getAllCategories);

router.route('/search').get(controllerSearch.getSearch);

router.route('/platforms').get(controllerUtils.getAllPlatforms);

router.route('/tags').get(controllerUtils.getAllTags);

export default router;
