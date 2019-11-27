import { database } from './database';
import { Subject } from '../entities/Subject';

export class SubjectRepository {
    static get tableName() {
        return 'subjects';
    }

    static async create({ teacherEmployeeId = undefined, shortName, fullName }) {
        const columns = ['short_name', 'full_name'];
        const variables = [shortName, fullName];

        if (teacherEmployeeId !== undefined) {
            columns.push('teacher_employee_id');
            variables.push(teacherEmployeeId);
        }
        
        const rows = await this.query(`
            INSERT INTO ${this.tableName}(${columns.join(', ')})
            VALUES (${variables.map((_, i) => `$${i + 1}`)})
            RETURNING *;
        `, variables);

        return this.deserialize(rows[0]);
    }

    static async update({ id, teacherEmployeeId = undefined, shortName = undefined, fullName = undefined }) {
        const updates = [];
        const variables = [id];

        if (teacherEmployeeId !== undefined) {
            variables.push(teacherEmployeeId);
            updates.push(`teacher_employee_id = $${variables.length}`);
        }

        if (shortName !== undefined) {
            variables.push(shortName);
            updates.push(`short_name = $${variables.length}`);
        }

        if (fullName !== undefined) {
            variables.push(fullName);
            updates.push(`full_name = $${variables.length}`);
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
            ORDER BY full_name ASC;
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
        return new Subject({
            id: row['id'],
            teacherEmployeeId: row['teacher_employee_id'],
            shortName: row['short_name'],
            fullName: row['full_name'],
        });
    }
}