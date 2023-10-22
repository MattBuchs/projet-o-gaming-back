import * as datamappers from '../models/index.datamapper.js';

export default {
    async getAllIssues(req, res) {
        try {
            const gameId = req.params.id_game;
            const issues = await datamappers.issueDatamapper.findIssuesWithGame(gameId);

            return res.json({ issues });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
        }
    },
    async getOneIssue(req, res) {
        try {
            const issueId = req.params.id_issue;

            const issue = await datamappers.issueDatamapper.findIssueWithDetails(issueId);
            if (!issue) {
                throw new Error(`Can not find issue with id ${issueId}`, { cause: { code: 404 } });
            }

            return res.json({ issue });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
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
                || isMinor === undefined
                || isPublic === undefined
                || isOnline === undefined
                || !frequency
                || !replication
                || !publishedAt
                || !userId
                || !platformId
            ) {
                throw new Error('Missing values', { cause: { code: 400 } });
            }

            const game = await datamappers.gameDatamapper.findByPk(gameId);
            if (!game) {
                throw new Error('Game not found', { cause: { code: 404 } });
            }

            const user = await datamappers.userDatamapper.findByPk(userId);
            if (!user) {
                throw new Error('User not found', { cause: { code: 404 } });
            }

            const getTagsByName = await Promise.all(tags.map(async (tag) => datamappers.tagDatamapper.findOne('title', tag)));

            if (getTagsByName.includes(null)) throw new Error('Tag not found', { cause: { code: 404 } });

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

            // We add the ids to the link table
            await Promise.all(ids.map(async (id) => datamappers.issueTagDatamapper.create({
                issue_id: issue.id,
                tag_id: id,
            })));

            return res.status(201).json({ message: 'Issue created successfully' });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
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
                throw new Error('Issue Not Found', { cause: { code: 404 } });
            }

            const isAuthor = req.user.userId === issue.user_id;
            const isDev = req.user.role === 'developer';

            // if user id given is not the author and not a dev send Unauthorized
            if (!isAuthor && !isDev) throw new Error('Unauthorized', { cause: { code: 401 } });

            const isPlayer = req.user.role === 'player';

            // if a player and assign to or inputData are present send Unauthorized
            // players can not assign or update status
            if (isPlayer && (inputData.assign_to || inputData.status)) {
                throw new Error('Unauthorized', { cause: { code: 401 } });
            }

            inputData.updated_at = new Date();
            await datamappers.issueDatamapper.update(inputData, issueId);

            return res.status(200).json({ message: 'Issue updated successfully' });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
    async deleteIssue(req, res) {
        const issueId = Number(req.params.id_issue);

        try {
            const issue = await datamappers.issueDatamapper.findByPk(issueId);
            if (!issue) {
                throw new Error('Issue Not Found', { cause: { code: 404 } });
            }

            // check user id given vs user id of the issue
            if (req.user.userId !== issue.user_id) throw new Error('Unauthorized', { cause: { code: 401 } });

            await datamappers.issueDatamapper.delete(issueId);

            return res.status(200).json({ message: 'Issue deleted successfully' });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};
