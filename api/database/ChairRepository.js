import { database } from './database';
import { Chair } from '../entities/Chair';

export class ChairRepository {
    static get tableName() {
        return 'chairs';
    }

    static async create({
        headEmployeeId = undefined,
        instituteId,
        name
    }) {
        const columns = ['institute_id', 'name'];
        const variables = [instituteId, name];

        if (headEmployeeId !== undefined) {
            columns.push('head_employee_id');
            variables.push(headEmployeeId);
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
        instituteId = undefined,
        headEmployeeId = undefined,
        name = undefined,
    }) {
        const updates = [];
        const variables = [id];

        if (instituteId !== undefined) {
            variables.push(instituteId);
            updates.push(`institute_id = $${variables.length}`);
        }

        if (headEmployeeId !== undefined) {
            variables.push(headEmployeeId);
            updates.push(`head_employee_id = $${variables.length}`);
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

    static async search({ instituteId = undefined }) {
        const whereClause = ['true'];
        const variables = [];

        if (instituteId !== undefined) {
            variables.push(instituteId);
            whereClause.push(`institute_id = $${variables.length}`);
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
        return new Chair({
            id: row['id'],
            instituteId: row['institute_id'],
            headEmployeeId: row['head_employee_id'],
            name: row['name'],
        });
    }
}