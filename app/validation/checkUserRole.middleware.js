import jwt from 'jsonwebtoken';

// this middleware is used to verify the role of the user
export default {
    isDeveloper(req, res, next) {
        const token = req.headers.authorization;

        if (token === undefined) return res.status(401).json({ error: 'Token undefined' });

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ error: 'Token verification failed' });

            if (user.role !== 'developer') return res.status(403).json({ error: 'You are not a developer' });

            next();
        });
    },

    isPlayer(req, res, next) {
        const token = req.headers.authorization;

        if (token === undefined) return res.status(401).json({ error: 'Token undefined' });

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ error: 'Token verification failed' });

            if (user.role !== 'player') return res.status(403).json({ error: 'You are not a player' });

            next();
        });
    },
};
