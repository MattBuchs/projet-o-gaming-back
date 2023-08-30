// this middleware is used to verify the role of the user
export default {
    isDeveloper(req, res, next) {
        const { user } = req;

        if (user && user.role === 'developer') next();
        else return res.status(403).json({ error: 'Forbidden' });
    },
};
