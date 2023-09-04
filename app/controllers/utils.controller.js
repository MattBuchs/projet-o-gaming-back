import * as datamappers from '../models/index.datamapper.js';

export default {
    async getAllPlatforms(req, res) {
        try {
            const platforms = await datamappers.platformDatamapper.findAll();
            if (!platforms) {
                return res.status(404).json({ error: 'No platforms found' });
            }

            return res.json({ platforms });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async getAllCategories(req, res) {
        try {
            const categories = await datamappers.categoryDatamapper.findAll();
            if (!categories) {
                return res.status(404).json({ error: 'No categories found' });
            }

            return res.json({ categories });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async getTagsFromGame(req, res) {
        const gameId = req.params.id_game;
        try {
            const tagsByGame = await datamappers.gameTagDatamapper.findTagsByGameId(gameId);
            if (!tagsByGame) {
                return res.status(404).json({ error: 'No tags found' });
            }

            const tags = await datamappers.tagDatamapper.findTagsByIds(tagsByGame.tag_ids);

            return res.json({ tags });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async getAllTags(req, res) {
        try {
            const tags = await datamappers.tagDatamapper.findAll();
            if (!tags) {
                return res.status(404).json({ error: 'No tags found' });
            }

            return res.json({ tags });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async home(req, res) {
        res.redirect('/docs');
    },
};
