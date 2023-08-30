import CoreDatamapper from './core.datamapper.js';

export default class TagDatamapper extends CoreDatamapper {
    tableName = 'tag';

    async findTagsByIds(ids) {
        const placeholders = ids.map((_, i) => `$${i + 1}`);
        const result = await this.client.query(`SELECT * FROM "tag" WHERE id IN (${placeholders})`, ids);
        return result.rows;
    }
}
