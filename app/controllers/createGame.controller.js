import * as datamappers from '../models/index.datamapper.js';

export default {
    async createGame(req, res) {
        const {
            name,
            description,
            picture,
            external_link: externalLink, release_date: releaseDate,
            user_id: userId,
        } = req.body;

        try {
            if (!name
                || !description
                || !picture
                || !externalLink
                || !userId) {
                return res.json({ error: 'Missing values' });
            }

            // const createGame = await datamappers.gameDatamapper.create({
            //     name,
            //     description,
            //     picture,
            //     externalLink,
            //     releaseDate,
            //     userId,
            // });

            // return res.json(!!createGame);
            return console.log('ok');
        } catch (err) {
            console.error(err);
        }
    },
};
