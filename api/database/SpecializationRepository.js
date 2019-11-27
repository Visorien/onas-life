import { database } from './database';
import { Specialization } from '../entities/Specialization';

export class SpecializationRepository {
    static get tableName() {
        return 'specializations';
    }

    static async create({
        degree = undefined,
        specialityId,
        name
    }) {
        const columns = ['speciality_id', 'name'];
        const variables = [specialityId, name];

        if (degree !== undefined) {
            columns.push('degree');
            variables.push(degree);
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
        specialityId = undefined,
        degree = undefined,
        name = undefined,
    }) {
        const updates = [];
        const variables = [id];

        if (specialityId !== undefined) {
            variables.push(specialityId);
            updates.push(`speciality_id = $${variables.length}`);
        }

        if (degree !== undefined) {
            variables.push(degree);
            updates.push(`degree = $${variables.length}`);
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

    static async search({ specialityId = undefined, degree = undefined }) {
        const whereClause = ['true'];
        const variables = [];

        if (specialityId !== undefined) {
            variables.push(specialityId);
            whereClause.push(`speciality_id = $${variables.length}`);
        }

        if (degree !== undefined) {
            variables.push(degree);
            whereClause.push(`degree = $${variables.length}`);
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
        return new Specialization({
            id: row['id'],
            degree: row['degree'],
            specialityId: row['speciality_id'],
            name: row['name'],
        });
    }
}