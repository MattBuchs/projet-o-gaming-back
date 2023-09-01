import CoreDatamapper from './core.datamapper.js';

export default class GameCategoryDatamapper extends CoreDatamapper {
    tableName = 'category_has_game';

    async deleteGameCategories(gameId) {
        const result = await this.client.query('DELETE FROM "category_has_game" WHERE game_id = $1', [gameId]);
        return result.rowCount;
    }
}
