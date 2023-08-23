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

        console.log('values: ', values);
        const placeholders = values.map((_, index) => `$${index + 1}`);
        console.log('placeholders: ', placeholders);

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

    async findOne(key, value) {
        const result = await this.client.query(`SELECT * FROM "${this.tableName}" WHERE ${key} = $1`, [value]);
        return result.rows[0] || null;
    }
}
