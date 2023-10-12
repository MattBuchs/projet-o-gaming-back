import express from 'express';
import controllerIssue from '../controllers/issue.controller.js';
import authenticateToken from '../validation/authToken.middleware.js';
import cleanScriptTagsMiddleware from '../validation/checkInjectionXSS.middleware.js';

const router = express.Router();

router.route('/:id_issue')
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
    .patch([authenticateToken, cleanScriptTagsMiddleware], controllerIssue.updateIssue)
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

export default router;
