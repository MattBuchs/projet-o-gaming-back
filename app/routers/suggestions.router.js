import express from 'express';
import controllerSuggestion from '../controllers/suggestion.controller.js';
import authenticateToken from '../validation/authToken.middleware.js';

const router = express.Router();

router.route('/:id_suggestion')
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

export default router;
