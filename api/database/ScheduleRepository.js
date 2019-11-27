import { database } from './database';
import { Schedule } from '../entities/Schedule';

export class ScheduleRepository {
    static get tableName() {
        return 'schedules';
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
        const rows = await this.query(`
            SELECT *
            FROM ${this.tableName}
            ORDER BY name ASC;
        `);

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
        return new Schedule({
            id: row['id'],
            name: row['name']
        });
    }
}
