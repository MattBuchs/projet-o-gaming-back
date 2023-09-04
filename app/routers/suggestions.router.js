import express from 'express';
import controllerSuggestion from '../controllers/suggestion.controller.js';
import authenticateToken from '../validation/authToken.middleware.js';

const router = express.Router();

router.route('/:id_suggestion')
    .get(controllerSuggestion.getOneSuggestion)
    .patch(authenticateToken, controllerSuggestion.updateSuggestion)
    .delete(authenticateToken, controllerSuggestion.deleteSuggestion);

export default router;
