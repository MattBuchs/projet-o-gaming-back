import * as datamappers from '../models/index.datamapper.js';

export default {
    async getAllIssues(req, res) {
        try {
            const gameId = req.params.id_game;
            const issues = await datamappers.issueDatamapper.findByKeyValue('game_id', gameId);
            return res.json({ issues });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
        }
    },
    async getOneIssue(req, res) {
        try {
            const gameId = req.params.id_game;
            const issueId = req.params.id_issue;
            const game = await datamappers.issueDatamapper.findByKeyValue('id', gameId);
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
            platform_id: platformId,
            tags,
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
                || !platformId
            ) {
                return res.status(400).json({ error: 'Missing values' });
            }

            const game = await datamappers.gameDatamapper.findByPk(gameId);
            if (!game) {
                return res.status(400).json({ error: 'Game Not Found' });
            }

            const user = await datamappers.userDatamapper.findByPk(userId);
            if (!user) {
                return res.status(400).json({ error: 'User Not Found' });
            }

            const getTagsByName = await Promise.all(tags.map(async (tag) => datamappers.tagDatamapper.findOne('title', tag)));

            if (getTagsByName.includes(null)) return res.status(400).json({ error: 'Tag Not Found' });

            const ids = getTagsByName.map((tag) => tag.id);

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
                platform_id: platformId,
            });

            const issue = await datamappers.issueDatamapper.findLatestByField('user_id', userId);

            await Promise.all(ids.map(async (id) => datamappers.issueTagDatamapper.create({
                issue_id: issue.id,
                tag_id: id,
            })));

            return res.status(201).json({ message: 'Issue created successfully' });
        } catch (err) {
            // code 23505 = unique_violation
            if (err.code === '23505') {
                return res.status(400).json({ error: 'Duplicate entry' });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
    async updateIssue(req, res) {
        const issueId = Number(req.params.id_issue);
        const inputData = req.body;

        try {
            const issue = await datamappers.issueDatamapper.findByPk(issueId);
            if (!issue) {
                return res.status(400).json({ error: 'Issue Not Found' });
            }

            const isAuthor = req.user.userId === issue.user_id;
            const isDev = req.user.role === 'developer';

            // if user id given is not the author and not a dev send Unauthorized
            if (!isAuthor && !isDev) return res.status(401).json({ error: 'Unauthorized' });

            const isPlayer = req.user.role === 'player';

            // if a player and assign to or inputData are present send Unauthorized
            // players can not assign or update status
            if (isPlayer && (inputData.assign_to || inputData.status)) {
                return res.status(400).json({ error: 'Unauthorized' });
            }

            await datamappers.issueDatamapper.update(inputData, issueId);

            return res.status(200).json({ message: 'Issue updated successfully' });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
    async deleteIssue(req, res) {
        const issueId = Number(req.params.id_issue);

        try {
            const issue = await datamappers.issueDatamapper.findByPk(issueId);
            if (!issue) {
                return res.status(400).json({ error: 'Issue Not Found' });
            }

            // check user id given vs user id of the issue
            if (req.user.userId !== issue.user_id) return res.status(401).json({ error: 'Unauthorized' });

            await datamappers.issueDatamapper.delete(issueId);

            return res.status(200).json({ message: 'Issue deleted successfully' });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};
