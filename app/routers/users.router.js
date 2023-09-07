import express from 'express';
import authenticateToken from '../validation/authToken.middleware.js';
import controllerUser from '../controllers/user.controller.js';

const router = express.Router();

router.route('/')
    /**
     * GET /users
     * @summary Get all users
     * @tags Users
     * @return {Array.<Users>} 200 - Array of users
     * @return {Error}  404 - Users not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerUser.getAllUsers);

router.route('/:id_user')
    /**
     * GET /users/{id_user}
     * @summary Get a user
     * @tags Users
     * @param {integer} id_user.path.required - User id
     * @return {User} 200 - User
     * @return {Error}  404 - User not found
     * @return {Error}  500 - Internal server error
     */
    .get(controllerUser.getOneUser)
    /**
     * PATCH /users/{id_user}
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

export default router;
