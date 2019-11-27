import { database } from './database';
import { Activity } from '../entities/Activity';
import { Week } from '../enums/Week';

export class ActivityRepository {
    static get tableName() {
        return 'activities';
    }

    static async create({
        teacherEmployeeId = undefined,
        weeks = undefined,
        scheduleId, subjectId, type, place, week, day, index
    }) {
        const columns = [
            'schedule_id', 'subject_id', 'type', 'place', 'week', 'day', 'index'
        ];
        const variables = [
            scheduleId, subjectId, type, place, week, day, index
        ];

        if (weeks !== undefined) {
            columns.push('weeks');
            variables.push(weeks);
        }

        if (teacherEmployeeId !== undefined) {
            columns.push('teacher_employee_id');
            variables.push(teacherEmployeeId);
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
        scheduleId = undefined, subjectId = undefined,
        teacherEmployeeId = undefined, type = undefined, place = undefined,
        week = undefined, weeks = undefined, day = undefined,
        index = undefined,
    }) {
        const updates = [];
        const variables = [id];

        if (scheduleId !== undefined) {
            variables.push(scheduleId);
            updates.push(`schedule_id = $${variables.length}`);
        }

        if (subjectId !== undefined) {
            variables.push(subjectId);
            updates.push(`subject_id = $${variables.length}`);
        }

        if (teacherEmployeeId !== undefined) {
            variables.push(teacherEmployeeId);
            updates.push(`teacher_employee_id = $${variables.length}`);
        }

        if (type !== undefined) {
            variables.push(type);
            updates.push(`type = $${variables.length}`);
        }

        if (place !== undefined) {
            variables.push(place);
            updates.push(`place = $${variables.length}`);
        }

        if (week !== undefined) {
            variables.push(week);
            updates.push(`week = $${variables.length}`);
        }

        if (weeks !== undefined) {
            variables.push(week);
            updates.push(`weeks = $${variables.length}`);
        }

        if (day !== undefined) {
            variables.push(day);
            updates.push(`day = $${variables.length}`);
        }

        if (index !== undefined) {
            variables.push(index);
            updates.push(`index = $${variables.length}`);
        }

        const rows = await this.query(`
            UPDATE ${this.tableName}
            SET ${updates.join(', ')}
            WHERE id = $1
            RETURNING *;
        `, variables);

        return this.deserialize(rows[0]);
    }

    static async search({
        scheduleId = undefined,
        day = undefined,
        week = undefined
    }) {
        const whereClause = ['true'];
        const variables = [];

        if (scheduleId !== undefined) {
            variables.push(scheduleId);
            whereClause.push(`schedule_id = $${variables.length}`);
        }

        if (day !== undefined) {
            variables.push(day);
            whereClause.push(`day = $${variables.length}`);
        }

        if (week !== undefined) {
            const weekOptions = [
                Week.CUSTOM,
                Week.EVERY,
            ];

            if (week % 2 === 0) {
                weekOptions.push(Week.EVEN);
            } else {
                weekOptions.push(Week.ODD);
            }

            whereClause.push(`week IN (${
                new Array(weekOptions.length)
                    .fill(undefined)
                    .map((_, i) => '$' + (variables.length + i + 1))
                    .join(', ')
            })`);

            variables.push(...weekOptions);

            variables.push(week);
            whereClause.push(`weeks IS NULL OR $${variables.length}=ANY(weeks)`);
        }

        const rows = await this.query(`
            SELECT *
            FROM ${this.tableName}
            WHERE (${whereClause.join(') AND (')})
            ORDER BY id DESC;
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
        return new Activity({
            id: row['id'],
            scheduleId: row['schedule_id'],
            subjectId: row['subject_id'],
            teacherEmployeeId: row['teacher_employee_id'],
            type: row['type'],
            place: row['place'],
            week: row['week'],
            weeks: row['weeks'],
            day: row['day'],
            index: row['index'],
        });
    }
}