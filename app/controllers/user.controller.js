import * as datamappers from '../models/index.datamapper.js';

export default {
    async getAllUsers(req, res) {
        try {
            const getUsers = await datamappers.userDatamapper.findAll();

            // Créer une nouvelle liste d'utilisateurs sans le champ password
            const users = getUsers.map(({
                password, created_at: createdAt, updated_at: updatedAt, role_id: roleId, ...user
            }) => user);

            return res.json({ users });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async getOneUser(req, res) {
        const userId = Number(req.params.id_user);
        try {
            const getUser = await datamappers.userDatamapper.findByPk(userId);
            delete getUser.password;

            if (!getUser) {
                return res.status(404).json(`Can not find user with id ${userId}`);
            }

            const role = await datamappers.roleDatamapper.findOne('id', getUser.role_id);

            let user;
            if (getUser.role_id === 1) {
                const games = await datamappers.gameDatamapper.findByKeyValue('user_id', userId);

                user = {
                    id: getUser.id,
                    username: getUser.username,
                    email: getUser.email,
                    avatar: getUser.avatar,
                    role: role.name,
                    games: games.map((game) => ({
                        id: game.id,
                        name: game.name,
                        description: game.description,
                        picture: game.picture,
                        external_link: game.external_link,
                        release_date: game.release_date,
                    })),
                };
            }

            if (getUser.role_id === 2) {
                const issues = await datamappers.issueDatamapper.findByKeyValue('user_id', userId);

                user = {
                    id: getUser.id,
                    username: getUser.username,
                    email: getUser.email,
                    avatar: getUser.avatar,
                    role: role.name,
                    issues: issues.map((issue) => ({
                        id: issue.id,
                        title: issue.title,
                        description: issue.description,
                        status: issue.status,
                        is_minor: issue.is_minor,
                        assign_to: issue.assign_to,
                        is_public: issue.is_public,
                        is_online: issue.is_online,
                        frequency: issue.frequency,
                        replication: issue.replication,
                        published_at: issue.published_at,
                        game_id: issue.game_id,
                        platform_id: issue.platform_id,
                    })),
                };
            }

            return res.json({ user });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};