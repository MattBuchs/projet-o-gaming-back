import * as datamappers from '../models/index.datamapper.js';

export default {
    async getSearch(req, res) {
        try {
            const filter = req.query;

            // get all the games
            const games = await datamappers.gameDatamapper.findAll();

            // get all the users
            const getUsers = await datamappers.userDatamapper.findAll();

            // create list of users without their passwords
            const users = getUsers.map(({
                password, created_at: createdAt, updated_at: updatedAt, role_id: roleId, ...user
            }) => user);

            // filter users and games by the search
            const filteredUsers = users.filter((user) => {
                if (user.username.toLowerCase().includes(filter.search.toLowerCase())) {
                    return true;
                }
                return false;
            });

            const filteredGames = games.filter((game) => {
                if (game.name.toLowerCase().includes(filter.search.toLowerCase())) {
                    return true;
                }
                return false;
            });

            // return res.json({ Games: filteredGames, Users: filteredUsers });
            return res.json({ Search: filter, Games: filteredGames, Users: filteredUsers });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};
