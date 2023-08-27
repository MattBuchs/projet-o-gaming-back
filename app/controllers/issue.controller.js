import * as datamappers from '../models/index.datamapper.js';

export default {
    async getAllIssues(req, res) {
        try {
            const gameId = req.params.id_game;
            const issues = await datamappers.issueDatamapper.findOne('game_id', gameId);
            return res.json({ issues });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
        }
    },
    async getOneIssue(req, res) {
        try {
            const gameId = req.params.id_game;
            const issueId = req.params.id_issue;
            const game = await datamappers.issueDatamapper.findOne('id', gameId);
            const issue = await datamappers.issueDatamapper.findBy2KeyValues('game_id', gameId, 'id', issueId);
            if (!game) {
                return res.status(404).json(`Can not find game with id ${gameId}`);
            }
            if (!issue) {
                return res.status(404).json(`Can not find issue with id ${issueId} for game with id ${gameId}`);
            }
            return res.json({ issue });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
        }
    },
    async createIssue(req, res) {
        const gameId = req.params.id_game;
        const {
            title,
            description,
            is_minor: isMinor,
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
                || !isMinor
                || !isPublic
                || !isOnline
                || !frequency
                || !replication
                || !publishedAt
                || !userId
                || !platform
            ) {
                return res.status(400).json({ error: 'Missing values' });
            }

            const getPlatform = await datamappers.platformDatamapper.findOne('name', platform);
            if (!getPlatform) {
                return res.status(400).json({ error: 'Invalid platform' });
            }

            const game = await datamappers.gameDatamapper.findByPk(gameId);
            if (!game) {
                return res.status(400).json({ error: 'Game Not Found' });
            }

            const user = await datamappers.userDatamapper.findByPk(userId);
            if (!user) {
                return res.status(400).json({ error: 'User Not Found' });
            }

            await datamappers.issueDatamapper.create({
                title,
                description,
                is_minor: isMinor,
                is_public: isPublic,
                is_online: isOnline,
                frequency,
                replication,
                published_at: publishedAt,
                user_id: userId,
                game_id: gameId,
                platform_id: getPlatform.id,
            });

            return res.status(201).json({ message: 'Issue created successfully' });
        } catch (err) {
            // code 23505 = unique_violation
            if (err.code === '23505') {
                return res.status(400).json({ error: 'Duplicate entry' });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
        }
    },
};
