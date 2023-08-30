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
};