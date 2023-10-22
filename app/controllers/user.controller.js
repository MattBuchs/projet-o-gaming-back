import bcrypt from 'bcrypt';
import * as datamappers from '../models/index.datamapper.js';

export default {
    async getAllUsers(req, res) {
        try {
            const getUsers = await datamappers.userDatamapper.findAll();

            // Create a new list of users without the password field
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
                throw new Error(`Can not find user with id ${userId}`, { cause: { code: 404 } });
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
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async updateUser(req, res) {
        const userId = Number(req.params.id_user);

        try {
            const user = await datamappers.userDatamapper.findByPk(userId);
            if (!user) {
                throw new Error(`Can not find user with id ${userId}`, { cause: { code: 404 } });
            }

            if (req.user.userId !== user.id) throw new Error('You can not update this user', { cause: { code: 403 } });

            const {
                username,
                old_password: oldPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            } = req.body;
            const inputData = {};

            if (username) {
                const newUsername = username.trim();
                if (newUsername.length < 3) {
                    throw new Error('Username must be at least 3 characters long', { cause: { code: 400 } });
                }

                inputData.username = newUsername;
            }

            if (oldPassword || newPassword || confirmPassword) {
                if (!oldPassword || !newPassword || !confirmPassword) {
                    throw new Error('Missing values', { cause: { code: 400 } });
                }

                const passwordExist = await bcrypt.compare(oldPassword, user.password);
                if (!passwordExist) {
                    throw new Error('An error has occurred', { cause: { code: 400 } });
                }

                if (newPassword !== confirmPassword) {
                    throw new Error('Passwords do not match', { cause: { code: 400 } });
                }

                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const encryptedPass = await bcrypt.hash(newPassword, salt);

                inputData.password = encryptedPass;
            }

            const updateInfos = await datamappers.userDatamapper.update(inputData, userId);

            return res.status(200).json({ updateInfos });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};
