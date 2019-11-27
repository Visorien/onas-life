import { database } from './database';
import { Group } from '../entities/Group';

export class GroupRepository {
    static get tableName() {
        return 'groups';
    }

    static async create({ scheduleId = undefined, gradeId, name }) {
        const columns = ['grade_id', 'name'];
        const variables = [gradeId, name];

        if (scheduleId !== undefined) {
            columns.push('schedule_id');
            variables.push(scheduleId);
        }

        const rows = await this.query(`
            INSERT INTO ${this.tableName}(${columns.join(', ')})
            VALUES (${columns.map((_, i) => `$${i + 1}`)})
            RETURNING *;
        `, variables);

        return this.deserialize(rows[0]);
    }

    static async update({
        id,
        scheduleId = undefined,
        gradeId = undefined,
        name = undefined,
    }) {
        const updates = [];
        const variables = [id];

        if (scheduleId !== undefined) {
            variables.push(scheduleId);
            updates.push(`schedule_id = $${variables.length}`);
        }

        if (gradeId !== undefined) {
            variables.push(gradeId);
            updates.push(`grade_id = $${variables.length}`);
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

    static async smartSearch({ name }, { limit = 50 } = {}) {
        const rows = await this.query(`
            SELECT *
            FROM ${this.tableName}
            WHERE name LIKE $1
            ORDER BY test.id IN (
                SELECT id
                FROM ${this.tableName}
                WHERE name LIKE $2
                LIMIT ${limit}
            ) DESC, name ASC;
        `, [`%${name}%`, `${name}%`]);

        return rows.map(row => this.deserialize(row));
    }

    static async search({ name = undefined, gradeId = undefined }) {
        const orderByClause = [];
        const whereClause = ['true'];
        const variables = [];

        if (gradeId !== undefined) {
            variables.push(gradeId);
            whereClause.push(`grade_id = $${variables.length}`);
        }

        if (name) {
            variables.push(`%${name}%`);
            whereClause.push(`name ILIKE $${variables.length}`);

            variables.push(`${name}%`);
            orderByClause.push(`
                id IN (
                    SELECT id
                    FROM ${this.tableName}
                    WHERE name ILIKE $2
                ) DESC
            `);
        }

        orderByClause.push('name ASC');

        const rows = await this.query(`
            SELECT *
            FROM ${this.tableName}
            WHERE ${whereClause.join(' AND ')}
            ORDER BY ${orderByClause.join(', ')};
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
        return new Group({
            id: row['id'],
            scheduleId: row['schedule_id'],
            gradeId: row['grade_id'],
            name: row['name'],
        });
    }
}