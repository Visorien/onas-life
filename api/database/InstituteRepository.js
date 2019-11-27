import { database } from './database';
import { Institute } from '../entities/Institute';

export class InstituteRepository {
    static get tableName() {
        return 'institutes';
    }

    static async create({ name }) {
        const columns = ['name'];
        const variables = [name];

        const rows = await this.query(`
            INSERT INTO ${this.tableName}(${columns.join(', ')})
            VALUES (${columns.map((_, i) => `$${i + 1}`)})
            RETURNING *;
        `, variables);

        return this.deserialize(rows[0]);
    }

    static async update({
        id,
        name = undefined,
    }) {
        const updates = [];
        const variables = [id];

        if (name !== undefined) {
            variables.push(name);
            updates.push(`name = $${variables.length}`);
        }

        const rows = await this.query(`
            UPDATE ${this.tableName}
            SET ${updates.join(', ')}
            WHERE id = $1
            RETURNING *;
        `, variables);

        return this.deserialize(rows[0]);
    }

    static async search() {
        const whereClause = ['true'];
        const variables = [];

        const rows = await this.query(`
            SELECT *
            FROM ${this.tableName}
            WHERE ${whereClause.join(' AND ')}
            ORDER BY name ASC;
        `, variables);

        return rows.map(row => this.deserialize(row));
    }

    static async findById(id) {
        const rows = await this.query(`
            SELECT *
            FROM ${this.tableName}
            WHERE id = $1;
        `, [id]);

        return rows.length > 0 ? this.deserialize(rows[0]) : null;
    }

    static async deleteById(id) {
        await this.query(`
            DELETE FROM ${this.tableName}
            WHERE id = $1;
        `, [id]);
    }

    static async query(sql, variables) {
        const results = await database.query(sql, variables);
        return results && results.rows || [];
    }

    static deserialize(row) {
        return new Institute({
            id: row['id'],
            name: row['name'],
        });
    }
}