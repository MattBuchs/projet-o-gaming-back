import * as datamappers from '../models/index.datamapper.js';

export default {
    async createGame(req, res) {
        const {
            name,
            description,
            picture,
            external_link: externalLink,
            release_date: releaseDate,
            user_id: userId,
            categories,
        } = req.body;

        try {
            if (!name
                || !description
                || !picture
                || !externalLink
                || !userId) {
                return res.json({ error: 'Missing values' });
            }

            const categoryIds = [];
            categories.forEach(async (category) => {
                const findCategory = await datamappers.categoryDatamapper
                    .findByName(category.toLowerCase());

                if (!findCategory) {
                    await datamappers.categoryDatamapper.create({
                        name: category.toLowerCase(),
                        color: '#000000',
                    });
                } else {
                    categoryIds.push(findCategory.id);
                }
            });

            const createGame = await datamappers.gameDatamapper.create({
                name,
                description,
                picture,
                externalLink,
                releaseDate,
                userId,
            });

            // return res.json({ message: 'Game created' });
        } catch (err) {
            console.error(err);
        }
    },
};
