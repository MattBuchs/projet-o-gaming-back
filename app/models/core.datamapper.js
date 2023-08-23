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

    async findOne(condition) {
        const result = await this.client.query(`SELECT * FROM "${this.tableName}" WHERE ${condition}`);
        return result.rows[0] || null;
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
}
