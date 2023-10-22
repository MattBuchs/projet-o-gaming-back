import * as datamappers from '../models/index.datamapper.js';

export default {
    async getAllGames(req, res) {
        try {
            const games = await datamappers.gameDatamapper.getGamesWithDetails();
            return res.json({ games });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
    async getOneGame(req, res) {
        try {
            const gameId = req.params.id_game;
            const game = await datamappers.gameDatamapper.findOneGameWithDetails(gameId);

            if (!game) {
                throw new Error(`Can not find game with id ${gameId}`, { cause: { code: 404 } });
            }

            return res.json({ game });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
    async createGame(req, res) {
        const { userId } = req.user;
        const {
            name,
            description,
            picture,
            external_link: externalLink,
            release_date: releaseDate,
            categories,
            tags,
        } = req.body;
        let findGame;

        try {
            if (!name
                || !description
                || !picture
                || !externalLink
                || !releaseDate
                || !categories
                || !userId) {
                throw new Error('Missing values', { cause: { code: 400 } });
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
                throw new Error('Game not created', { cause: { code: 400 } });
            }

            findGame = await datamappers.gameDatamapper.findOne('name', name);

            if (!findGame) {
                throw new Error('Game not found', { cause: { code: 404 } });
            }

            // If there are tags, we check if they are already in the database,
            // and if they are not there we create them
            if (tags && tags.length > 0) {
                Promise.all(tags.map(async (tag) => {
                    const tagTitle = tag.toLowerCase();
                    let findTag = await datamappers.tagDatamapper.findOne('title', tagTitle);

                    if (!findTag) {
                        await datamappers.tagDatamapper.create({ title: tagTitle });
                        findTag = await datamappers.tagDatamapper.findOne('title', tagTitle);
                    }

                    if (!findTag.id) {
                        throw new Error('The game was not created', { cause: { code: 400 } });
                    }

                    await datamappers.gameTagDatamapper.create({
                        game_id: findGame.id,
                        tag_id: findTag.id,
                    });
                }));
            }

            // We link the categories to the game
            Promise.all(categories.map(async (category) => {
                const findCategory = await datamappers.categoryDatamapper.findOne('name', category);

                if (!findCategory) {
                    throw new Error('Category not found', { cause: { code: 404 } });
                }

                await datamappers.gameCategoryDatamapper.create({
                    category_id: findCategory.id,
                    game_id: findGame.id,
                });
            }));

            return res.status(201).json({ message: 'Game created' });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                if (err.message === 'The game was not created') {
                    await datamappers.gameCategoryDatamapper.deleteGameCategories(findGame.id);
                    await datamappers.gameDatamapper.delete(findGame.id);
                }

                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async updateGame(req, res) {
        const gameId = Number(req.params.id_game);
        const inputData = req.body;

        try {
            const game = await datamappers.gameDatamapper.findByPk(gameId);
            if (!game) {
                throw new Error('Issue Not Found', { cause: { code: 400 } });
            }

            if (req.user.userId !== game.user_id) throw new Error('Unauthorized', { cause: { code: 401 } });

            inputData.updated_at = new Date();
            await datamappers.gameDatamapper.update(inputData, gameId);

            return res.status(200).json({ message: 'Game updated successfully' });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async deleteGame(req, res) {
        const gameId = Number(req.params.id_game);
        try {
            const game = await datamappers.gameDatamapper.findByPk(gameId);
            if (!game) {
                throw new Error('Game not found', { cause: { code: 404 } });
            }

            if (req.user.userId !== game.user_id) throw new Error('Unauthorized', { cause: { code: 401 } });

            const issues = await datamappers.issueDatamapper.findByKeyValue('game_id', gameId);
            const categoryHasGame = await datamappers.gameCategoryDatamapper.findByKeyValue('game_id', gameId);
            const gameHasTag = await datamappers.gameTagDatamapper.findByKeyValue('game_id', gameId);

            if (issues) {
                await Promise.all(issues.map(async (issue) => {
                    await datamappers.issueDatamapper.delete(issue.id);
                }));
            }

            if (categoryHasGame) {
                await Promise.all(categoryHasGame.map(async () => {
                    await datamappers.gameCategoryDatamapper.deleteByFk('game_id', gameId);
                }));
            }

            if (gameHasTag) {
                await Promise.all(gameHasTag.map(async () => {
                    await datamappers.gameTagDatamapper.deleteByFk('game_id', gameId);
                }));
            }

            await datamappers.gameDatamapper.delete(gameId);

            return res.json({ message: 'Game deleted' });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};
