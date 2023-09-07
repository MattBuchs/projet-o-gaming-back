import * as datamappers from '../models/index.datamapper.js';

export default {
    async getAllGames(req, res) {
        try {
            const games = await datamappers.gameDatamapper.getGamesWithDetails();
            return res.json({ games });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
        }
    },
    async getOneGame(req, res) {
        try {
            const gameId = req.params.id_game;
            const game = await datamappers.gameDatamapper.findOneGameWithDetails(gameId);

            if (!game) {
                return res.status(404).json(`Can not find game with id ${gameId}`);
            }
            return res.json({ game });
        } catch (err) {
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

            findGame = await datamappers.gameDatamapper.findOne('name', name);

            if (!findGame) {
                return res.status(404).json({ error: 'Game not found' });
            }

            if (tags && tags.length > 0) {
                Promise.all(tags.map(async (tag) => {
                    const tagTitle = tag.toLowerCase();
                    let findTag = await datamappers.tagDatamapper.findOne('title', tagTitle);

                    if (!findTag) {
                        await datamappers.tagDatamapper.create({ title: tagTitle });
                        findTag = await datamappers.tagDatamapper.findOne('title', tagTitle);
                    }

                    if (!findTag.id) {
                        throw new Error('The game was not created');
                    }

                    await datamappers.gameTagDatamapper.create({
                        game_id: findGame.id,
                        tag_id: findTag.id,
                    });
                }));
            }

            Promise.all(categories.map(async (category) => {
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
            if (err.message === 'The game was not created') {
                await datamappers.gameCategoryDatamapper.deleteGameCategories(findGame.id);
                await datamappers.gameDatamapper.delete(findGame.id);
                return res.status(500).json({ error: err.message });
            }
            return res.status(500).json({ error: `Internal Server Error: ${err}` });
        }
    },

    async updateGame(req, res) {
        const gameId = Number(req.params.id_game);
        const inputData = req.body;

        try {
            const game = await datamappers.gameDatamapper.findByPk(gameId);
            if (!game) {
                return res.status(400).json({ error: 'Issue Not Found' });
            }

            if (req.user.userId !== game.user_id) return res.status(401).json({ error: 'Unauthorized' });

            inputData.updated_at = new Date();
            await datamappers.gameDatamapper.update(inputData, gameId);

            return res.status(200).json({ message: 'Game updated successfully' });
        } catch (err) {
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async deleteGame(req, res) {
        const gameId = Number(req.params.id_game);
        try {
            const game = await datamappers.gameDatamapper.findByPk(gameId);
            if (!game) {
                return res.status(404).json({ error: 'Game not found' });
            }

            if (req.user.userId !== game.user_id) return res.status(401).json({ error: 'Unauthorized' });

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
            return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};
