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
                throw new Error(`Can not find suggestion with id ${suggestionId}`, { cause: { code: 404 } });
            }
            return res.json({ suggestion });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
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
                throw new Error('Missing values', { cause: { code: 400 } });
            }

            const game = await datamappers.gameDatamapper.findByPk(gameId);
            if (!game) {
                throw new Error(`Can not find game with id ${gameId}`, { cause: { code: 404 } });
            }

            const user = await datamappers.userDatamapper.findByPk(userId);
            if (!user) {
                throw new Error(`Can not find user with id ${userId}`, { cause: { code: 404 } });
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
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
    async updateSuggestion(req, res) {
        const suggestionId = Number(req.params.id_suggestion);
        const inputData = req.body;

        try {
            const suggestion = await datamappers.suggestionDatamapper.findByPk(suggestionId);
            if (!suggestion) {
                throw new Error(`Can not find suggestion with id ${suggestionId}`, { cause: { code: 404 } });
            }

            const isAuthor = req.user.userId === suggestion.user_id;
            const isDev = req.user.role === 'developer';

            // if user id given is not the author and not a dev send Unauthorized
            if (!isAuthor && !isDev) throw new Error('Unauthorized', { cause: { code: 401 } });

            await datamappers.suggestionDatamapper.update(inputData, suggestionId);

            return res.status(200).json({ message: 'Suggestion updated successfully' });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
    async deleteSuggestion(req, res) {
        const suggestionId = Number(req.params.id_suggestion);

        try {
            const suggestion = await datamappers.suggestionDatamapper.findByPk(suggestionId);
            if (!suggestion) {
                throw new Error(`Can not find suggestion with id ${suggestionId}`, { cause: { code: 404 } });
            }

            const isAuthor = req.user.userId === suggestion.user_id;
            const isDev = req.user.role === 'developer';

            // if user id given is not the author and not a dev send Unauthorized
            if (!isAuthor && !isDev) throw new Error('Unauthorized', { cause: { code: 401 } });

            await datamappers.suggestionDatamapper.delete(suggestionId);

            return res.status(200).json({ message: 'Suggestion deleted successfully' });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};
