export default class CoreDatamapper {
    client;

    tableName;

    constructor(client) {
        this.client = client;
    }

    async findAll() {
        const result = await this.client.query(`SELECT * FROM "${this.tableName}"`);
        return result.rows;
    }

    async findByPk(id) {
        const result = await this.client.query(`SELECT * FROM "${this.tableName}" WHERE id = $1`, [id]);
        return result.rows[0];
    }

    async create(inputData) {
        const fields = Object.keys(inputData);
        const values = Object.values(inputData);

        const placeholders = values.map((_, index) => `$${index + 1}`);

        const result = await this.client.query(
            `
          INSERT INTO "${this.tableName}" (${fields})
          VALUES (${placeholders})
        `,
            values,
        );

        return !!result.rowCount;
    }

    async update() {
        // TODO
    }

    async delete() {
        // TODO
    }

    async findByEmail(email) {
        const result = await this.client.query(`SELECT * FROM "${this.tableName}" WHERE email = $1`, [email]);
        return result.rows[0] || null;
    }

    // pourrions-nous changer le nom de cette méthode puisqu'elle peut être utilisée pour trouver plus qu'un seul result ?
    // could we chagne the name of this method since it can be used to find more than just one
    // async findByKeyValue(key, value) {
    async findOne(key, value) {
        const result = await this.client.query(`SELECT * FROM "${this.tableName}" WHERE ${key} = $1`, [value]);
        return result.rows[0] || null;
    }

    async findBy2KeyValues(key1, value1, key2, value2) {
        const result = await this.client.query(`SELECT * FROM "${this.tableName}" WHERE ${key1} = $1 and ${key2}= $2`, [value1, value2]);
        return result.rows[0] || null;
    }
}
