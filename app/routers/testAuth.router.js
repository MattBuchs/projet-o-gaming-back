import express from 'express';
import authenticateToken from '../validation/authToken.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    res.json({ message: 'Token authenticated' });
});

export default router;
