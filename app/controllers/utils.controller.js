import * as datamappers from '../models/index.datamapper.js';

export default {
    async getAllPlatforms(req, res) {
        try {
            const platforms = await datamappers.platformDatamapper.findAll();
            if (!platforms) {
                throw new Error('No platforms found', { cause: { code: 404 } });
            }

            return res.json({ platforms });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async getAllCategories(req, res) {
        try {
            const categories = await datamappers.categoryDatamapper.findAll();
            if (!categories) {
                throw new Error('No categories found', { cause: { code: 404 } });
            }

            return res.json({ categories });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async getTagsFromGame(req, res) {
        const gameId = req.params.id_game;
        try {
            const tagsByGame = await datamappers.gameTagDatamapper.findTagsByGameId(gameId);
            if (!tagsByGame) {
                throw new Error('tags not found', { cause: { code: 404 } });
            }

            const tags = await datamappers.tagDatamapper.findTagsByIds(tagsByGame.tag_ids);

            return res.json({ tags });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async getAllTags(req, res) {
        try {
            const tags = await datamappers.tagDatamapper.findAll();
            if (!tags) {
                throw new Error('tags not found', { cause: { code: 404 } });
            }

            return res.json({ tags });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async home(req, res) {
        res.redirect('/docs');
    },
};
