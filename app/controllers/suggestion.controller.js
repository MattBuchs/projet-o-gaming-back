import * as datamappers from '../models/index.datamapper.js';

export default {
    async getAllSuggestions(req, res) {
        try {
            const gameId = req.params.id_game;
            // find all sugestions associated with game ID
            const suggestions = await datamappers.suggestionDatamapper.findByKeyValue('game_id', gameId);
            return res.json({ suggestions });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
        }
    },
    async getOneSuggestion(req, res) {
        try {
            const gameId = req.params.id_game;
            const suggestionId = req.params.id_suggestion;
            const game = await datamappers.suggestionDatamapper.findByKeyValue('id', gameId);
            const suggestion = await datamappers.suggestionDatamapper.findBy2KeyValues('game_id', gameId, 'id', suggestionId);
            if (!game) {
                return res.status(404).json(`Can not find game with id ${gameId}`);
            }
            if (!suggestion) {
                return res.status(404).json(`Can not find suggestion with id ${suggestionId} for game with id ${gameId}`);
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
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
        }
    },
    async deleteSuggestion(req, res) {
        const suggestionId = Number(req.params.id_suggestion);
        const { userId } = req.user;

        try {
            const suggestion = await datamappers.suggestionDatamapper.findByPk(suggestionId);
            if (!suggestion) {
                return res.status(400).json({ error: 'Suggestion Not Found' });
            }

            const suggestionAuthorId = suggestion.user_id;
            // check user id given vs user id of the suggestion
            if (userId !== suggestionAuthorId) return res.status(401).json({ error: 'Unauthorized' });

            await datamappers.suggestionDatamapper.delete(suggestionId);

            return res.status(200).json({ message: 'Suggestion deleted successfully' });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};
