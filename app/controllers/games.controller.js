import DatabaseError from '../errors/database.error.js';
import UserInputError from '../errors/user.input.error.js';
import * as datamappers from '../models/index.datamapper.js';

export default {
    async getGames(req, res) {
        try {
            const games = await datamappers.gameDatamapper.findAll();
            return res.json({ games: `${games}` });
        } catch (err) {
            // code 23505 = unique_violation
            if (err.code === '23505') {
                throw new UserInputError(err);
            } else {
                return res.status(500).json({ error: `Internal Server Error: ${DatabaseError(err)}` });
                throw new DatabaseError(err);
            }
        }
    },
};
