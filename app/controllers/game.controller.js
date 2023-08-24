import * as datamappers from '../models/index.datamapper.js';
import DatabaseError from '../errors/database.error.js';
import UserInputError from '../errors/user.input.error.js';

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
            tags,
        } = req.body;

        try {
            if (!name
                || !description
                || !picture
                || !externalLink
                || !releaseDate
                || !categories
                || !userId) {
                return res.json({ error: 'Missing values' });
            }

            const createGame = await datamappers.gameDatamapper.create({
                name,
                description,
                picture,
                external_link: externalLink,
                release_date: releaseDate,
                user_id: userId,
            });

            if (!createGame) {
                return res.json({ error: 'Game not created' });
            }

            const findGame = await datamappers.gameDatamapper.findOne('name', name);

            if (!findGame) {
                return res.json({ error: 'Game not found' });
            }

            if (tags) {
                tags.forEach(async (tag) => {
                    let findTag = await datamappers.tagDatamapper.findOne('title', tag);

                    if (!findTag) {
                        await datamappers.tagDatamapper.create({
                            title: tag.toLowerCase(),
                        });

                        findTag = await datamappers.tagDatamapper.findOne('title', tag);
                    }

                    await datamappers.gameTagDatamapper.create({
                        game_id: findGame.id,
                        tag_id: findTag.id,
                    });
                });
            }

            categories.forEach(async (category) => {
                const findCategory = await datamappers.categoryDatamapper.findOne('name', category);

                if (!findCategory) {
                    return res.json({ error: 'Category not found' });
                }

                const createCategoryHasGame = await datamappers.gameCategoryDatamapper.create({
                    category_id: findCategory.id,
                    game_id: findGame.id,
                });

                return !!createCategoryHasGame;
            });

            return res.json({ message: 'Game created' });
        } catch (err) {
            if (err.code === '23505') {
                throw new UserInputError(err);
            } else {
                throw new DatabaseError(err);
            }
        }
    },
};
