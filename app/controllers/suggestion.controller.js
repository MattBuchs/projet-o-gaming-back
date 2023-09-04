import * as datamappers from '../models/index.datamapper.js';

export default {
    async getAllSuggestions(req, res) {
        try {
            const gameId = req.params.id_game;
            // find all sugestions associated with game ID
            const suggestions = await datamappers
                .suggestionDatamapper.findSuggestionsWithGame(gameId);
            return res.json({ suggestions });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
        }
    },
    async getOneSuggestion(req, res) {
        try {
            const suggestionId = req.params.id_suggestion;

            const suggestion = await datamappers
                .suggestionDatamapper.findSuggestionWithDetails(suggestionId);
            if (!suggestion) {
                return res.status(404).json(`Can not find suggestion with id ${suggestionId}`);
            }
            return res.json({ suggestion });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
        }
    },
    async createSuggestion(req, res) {
        const gameId = req.params.id_game;
        const {
            title,
            description,
            published_at: publishedAt,
            user_id: userId,
        } = req.body;

        try {
            if (!title
                || !description
                || !publishedAt
                || !userId
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

            await datamappers.suggestionDatamapper.create({
                title,
                description,
                published_at: publishedAt,
                user_id: userId,
                game_id: gameId,
            });

            return res.status(201).json({ message: 'Suggestion created successfully' });
        } catch (err) {
            // code 23505 = unique_violation
            if (err.code === '23505') {
                return res.status(400).json({ error: 'Duplicate entry' });
            }
            console.log(err);
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
    async updateSuggestion(req, res) {
        const suggestionId = Number(req.params.id_suggestion);
        const inputData = req.body;

        try {
            const suggestion = await datamappers.suggestionDatamapper.findByPk(suggestionId);
            if (!suggestion) {
                return res.status(400).json({ error: 'Suggestion Not Found' });
            }

            const isAuthor = req.user.userId === suggestion.user_id;
            const isDev = req.user.role === 'developer';

            // if user id given is not the author and not a dev send Unauthorized
            if (!isAuthor && !isDev) return res.status(401).json({ error: 'Unauthorized' });

            await datamappers.suggestionDatamapper.update(inputData, suggestionId);

            return res.status(200).json({ message: 'Suggestion updated successfully' });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
    async deleteSuggestion(req, res) {
        const suggestionId = Number(req.params.id_suggestion);

        try {
            const suggestion = await datamappers.suggestionDatamapper.findByPk(suggestionId);
            if (!suggestion) {
                return res.status(400).json({ error: 'Suggestion Not Found' });
            }

            const isAuthor = req.user.userId === suggestion.user_id;
            const isDev = req.user.role === 'developer';

            // if user id given is not the author and not a dev send Unauthorized
            if (!isAuthor && !isDev) return res.status(401).json({ error: 'Unauthorized' });

            await datamappers.suggestionDatamapper.delete(suggestionId);

            return res.status(200).json({ message: 'Suggestion deleted successfully' });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};
