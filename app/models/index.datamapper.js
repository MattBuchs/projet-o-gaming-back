import client from '../helpers/db.js';

// les différents datamappers
import CategoryDatamapper from './category.datamapper.js';
import CommentDatamapper from './comment.datamapper.js';
import GameDatamapper from './game.datamapper.js';
import IssueDatamapper from './issue.datamapper.js';
import PlatformDatamapper from './platform.datamapper.js';
import RoleDatamapper from './role.datamapper.js';
import SuggestionDatamapper from './suggestion.datamapper.js';
import TagDatamapper from './tag.datamapper.js';
import UserDatamapper from './user.datamapper.js';
import GameCategoryDatamapper from './gameCategory.datamapper.js';
import IssueTagDatamapper from './issueTag.datamapper.js';

// Instanciation avec injection du client dans le constructeur
export const categoryDatamapper = new CategoryDatamapper(client);
export const commentDatamapper = new CommentDatamapper(client);
export const gameDatamapper = new GameDatamapper(client);
export const issueDatamapper = new IssueDatamapper(client);
export const platformDatamapper = new PlatformDatamapper(client);
export const roleDatamapper = new RoleDatamapper(client);
export const suggestionDatamapper = new SuggestionDatamapper(client);
export const tagDatamapper = new TagDatamapper(client);
export const userDatamapper = new UserDatamapper(client);
export const gameCategoryDatamapper = new GameCategoryDatamapper(client);
export const issueTagDatamapper = new IssueTagDatamapper(client);
