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
};
