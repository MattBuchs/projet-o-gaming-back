import express from 'express';
import controllerIssue from '../controllers/issue.controller.js';
import authenticateToken from '../validation/authToken.middleware.js';

const router = express.Router();

/* Issues */
router.route('/:id_game/issues')
    .get(controllerIssue.getAllIssues)
    .post(authenticateToken, controllerIssue.createIssue);

router.route('/:id_game/issue/:id_issue')
    .get(controllerIssue.getOneIssue)
    .patch(authenticateToken, controllerIssue.updateIssue)
    .delete(authenticateToken, controllerIssue.deleteIssue);

export default router;
