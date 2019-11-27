import { database } from './database';
import { Speciality } from '../entities/Speciality';

export class SpecialityRepository {
    static get tableName() {
        return 'specialities';
    }

    static async create({ chairId, name }) {
        const columns = ['chair_id', 'name'];
        const variables = [chairId, name];

        const rows = await this.query(`
            INSERT INTO ${this.tableName}(${columns.join(', ')})
            VALUES (${columns.map((_, i) => `$${i + 1}`)})
            RETURNING *;
        `, variables);

        return this.deserialize(rows[0]);
    }

    static async update({
        id,
        chairId = undefined, name = undefined,
    }) {
        const updates = [];
        const variables = [id];

        if (chairId !== undefined) {
            variables.push(chairId);
            updates.push(`chair_id = $${variables.length}`);
        }

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

    static async search({ chairId = undefined }) {
        const whereClause = ['true'];
        const variables = [];

        if (chairId !== undefined) {
            variables.push(chairId);
            whereClause.push(`chair_id = $${variables.length}`);
        }

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
        return new Speciality({
            id: row['id'],
            chairId: row['chair_id'],
            name: row['name'],
        });
    }
}