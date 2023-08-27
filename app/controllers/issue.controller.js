import * as datamappers from '../models/index.datamapper.js';

export default {
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

            return res.status(201).json({ message: 'Issue created successfully' });
        } catch (err) {
            // code 23505 = unique_violation
            if (err.code === '23505') {
                return res.status(400).json({ error: 'Duplicate entry' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
    },

    async updateAuthorIssue(req, res) {
        const issueId = Number(req.params.id_issue);
        const inputData = req.body;

        try {
            const issue = await datamappers.issueDatamapper.findByPk(issueId);
            if (!issue) {
                return res.status(400).json({ error: 'Issue Not Found' });
            }

            if (req.user.userId !== issue.user_id) return res.status(401).json({ error: 'Unauthorized' });

            await datamappers.issueDatamapper.update(inputData, issueId);

            return res.status(200).json({ message: 'Issue updated successfully' });
        } catch (err) {
            // code 23505 = unique_violation
            if (err.code === '23505') {
                return res.status(400).json({ error: 'Duplicate entry' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
    },

    async updateDeveloperIssue(req, res) {
        const issueId = Number(req.params.id_issue);
        const inputData = req.body;

        try {
            const issue = await datamappers.issueDatamapper.findByPk(issueId);
            if (!issue) {
                return res.status(400).json({ error: 'Issue Not Found' });
            }

            const game = await datamappers.gameDatamapper.findByPk(issue.game_id);

            if (req.user.userId !== game.user_id) return res.status(401).json({ error: 'Unauthorized' });

            await datamappers.issueDatamapper.update(inputData, issueId);

            return res.status(200).json({ message: 'Issue updated successfully' });
        } catch (err) {
            // code 23505 = unique_violation
            if (err.code === '23505') {
                return res.status(400).json({ error: 'Duplicate entry' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
    },

    async deleteIssue(req, res) {
        const issueId = Number(req.params.id_issue);

        try {
            const issue = await datamappers.issueDatamapper.findByPk(issueId);
            if (!issue) {
                return res.status(400).json({ error: 'Issue Not Found' });
            }

            if (req.user.userId !== issueId) return res.status(401).json({ error: 'Unauthorized' });

            await datamappers.issueDatamapper.delete(issueId);

            return res.status(200).json({ message: 'Issue deleted successfully' });
        } catch (err) {
            return res.status(500).json({ error: 'Database error' });
        }
    },
};
