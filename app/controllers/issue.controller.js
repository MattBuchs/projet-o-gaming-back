import * as datamappers from '../models/index.datamapper.js';
import DatabaseError from '../errors/database.error.js';
import UserInputError from '../errors/user.input.error.js';

export default {
    async createIssue(req, res) {
        const gameId = req.params.id_game;
        const {
            title,
            description,
            status,
            is_minor: isMinor,
            assign_to: assignTo,
            is_public: isPublic,
            is_online: isOnline,
            frequency,
            replication,
            published_at: publishedAt,
            user_id: userId,
            platform,
        } = req.body;

        try {
            if (!title
                || !description
                || !status
                || !isMinor
                || !isPublic
                || !isOnline
                || !frequency
                || !replication
                || !publishedAt
                || !userId
                || !platform
            ) {
                return res.json({ error: 'Missing values' });
            }

            const getPlatform = await datamappers.platformDatamapper.findOne('name', platform);
            if (!getPlatform) {
                return res.json({ error: 'Invalid platform' });
            }

            const game = await datamappers.gameDatamapper.findByPk(gameId);
            if (!game) {
                return res.json({ error: 'Game Not Found' });
            }

            const user = await datamappers.userDatamapper.findByPk(userId);
            if (!user) {
                return res.json({ error: 'User Not Found' });
            }

            const createIssue = await datamappers.issueDatamapper.create({
                title,
                description,
                status,
                is_minor: isMinor,
                assign_to: assignTo,
                is_public: isPublic,
                is_online: isOnline,
                frequency,
                replication,
                published_at: publishedAt,
                user_id: userId,
                game_id: gameId,
                platform_id: getPlatform.id,
            });

            return res.json(!!createIssue);
        } catch (err) {
            // code 23505 = unique_violation
            if (err.code === '23505') {
                throw new UserInputError(err);
            } else {
                throw new DatabaseError(err);
            }
        }
    },
};
