import * as datamappers from '../models/index.datamapper.js';
import DatabaseError from '../errors/database.error.js';
import UserInputError from '../errors/user.input.error.js';

export default {
    async getAllGames(req, res) {
        try {
            const games = await datamappers.gameDatamapper.findAll();
            return res.json({ games });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
        }
    },
    async getOneGame(req, res) {
        try {
            const gameId = req.params.id_game;
            const game = await datamappers.gameDatamapper.findOne('id', gameId);
            // not sure if needed:
            // const findGame = await datamappers.gameDatamapper.findByPk(gameId);
            if (!game) {
                return res.status(404).json(`Can not find game with id ${gameId}`);
            }
            return res.json({ game });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${DatabaseError(err)}` });
        }
    },
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
                return res.status(400).json({ error: 'Missing values' });
            }

            const createdGame = await datamappers.gameDatamapper.create({
                name,
                description,
                picture,
                external_link: externalLink,
                release_date: releaseDate,
                user_id: userId,
            });

            if (!createdGame) {
                return res.status(500).json({ error: 'Game not created' });
            }

            const findGame = await datamappers.gameDatamapper.findOne('name', name);

            if (!findGame) {
                return res.status(404).json({ error: 'Game not found' });
            }

            if (tags && tags.length > 0) {
                await Promise.all(tags.map(async (tag) => {
                    const tagTitle = tag.toLowerCase();
                    let findTag = await datamappers.tagDatamapper.findOne('title', tagTitle);

                    if (!findTag) {
                        findTag = await datamappers.tagDatamapper.create({ title: tagTitle });
                    }

                    await datamappers.gameTagDatamapper.create({
                        game_id: findGame.id,
                        tag_id: findTag.id,
                    });
                }));
            }

            await Promise.all(categories.map(async (category) => {
                const findCategory = await datamappers.categoryDatamapper.findOne('name', category);

                if (!findCategory) {
                    return res.status(404).json({ error: 'Category not found' });
                }

                await datamappers.gameCategoryDatamapper.create({
                    category_id: findCategory.id,
                    game_id: findGame.id,
                });
            }));

            return res.json({ message: 'Game created' });
        } catch (err) {
            if (err.code === '23505') {
                return res.status(400).json({ error: 'Duplicate entry' });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
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
