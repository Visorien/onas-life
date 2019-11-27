import { database } from './database';
import { Employee } from '../entities/Employee';

export class EmployeeRepository {
    static get tableName() {
        return 'employees';
    }

    static async create({
        firstName, lastName, middleName,
        phoneNumber = undefined, email = undefined
    }) {
        const columns = ['first_name', 'last_name', 'middle_name'];
        const variables = [firstName, lastName, middleName];

        if (phoneNumber !== undefined) {
            columns.push('phone_number');
            variables.push(phoneNumber);
        }

        if (email !== undefined) {
            columns.push('email');
            variables.push(email);
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
        firstName = undefined, lastName = undefined, middleName = undefined,
        phoneNumber = undefined, email = undefined
    }) {
        const updates = [];
        const variables = [id];

        if (firstName !== undefined) {
            variables.push(firstName);
            updates.push(`first_name = $${variables.length}`);
        }

        if (lastName !== undefined) {
            variables.push(lastName);
            updates.push(`last_name = $${variables.length}`);
        }

        if (middleName !== undefined) {
            variables.push(middleName);
            updates.push(`middle_name = $${variables.length}`);
        }

        if (phoneNumber !== undefined) {
            variables.push(phoneNumber);
            updates.push(`phone_number = $${variables.length}`);
        }

        if (email !== undefined) {
            variables.push(email);
            updates.push(`email = $${variables.length}`);
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
            ORDER BY last_name, first_name, middle_name ASC;
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
        return new Employee({
            id: row['id'],
            firstName: row['first_name'],
            lastName: row['last_name'],
            middleName: row['middle_name'],
            phoneNumber: row['phone_number'],
            email: row['email'],
        });
    }
}