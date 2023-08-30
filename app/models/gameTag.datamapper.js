import CoreDatamapper from './core.datamapper.js';

export default class GameTagDatamapper extends CoreDatamapper {
    tableName = 'game_has_tag';

    async findTagsByGameId(gameId) {
        const result = await this.client.query('SELECT ARRAY_AGG("tag_id") AS tag_ids FROM "game_has_tag" WHERE game_id = $1', [gameId]);
        return result.rows[0];
    }
}
