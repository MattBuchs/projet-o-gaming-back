import * as datamappers from '../models/index.datamapper.js';

export default {
    async getAllUsers(req, res) {
        try {
            const users = await datamappers.userDatamapper.findAll();

            return res.json({ users });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async getOneUser(req, res) {
        const userId = Number(req.params.id_user);
        try {
            const user = await datamappers.userDatamapper.findByPk(userId);

            if (!user) {
                return res.status(404).json(`Can not find user with id ${userId}`);
            }

            return res.json({ user });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};
