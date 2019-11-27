/** @typedef {import('pg').Pool} PgPool */

module.exports = {
    /** @param {PgPool} db */
    up: async (db) => {
        await db.query(`
            CREATE TABLE activities (
                id SERIAL PRIMARY KEY,
                schedule_id INTEGER NOT NULL,
                subject_id INTEGER NOT NULL,
                teacher_employee_id INTEGER,
                type ACTIVITY_TYPE NOT NULL,
                place varchar(120) NOT NULL,
                week WEEK NOT NULL,
                weeks INTEGER[],
                day WEEKDAY NOT NULL,
                index INTEGER NOT NULL
            );
        `);
    },

    /** @param {PgPool} db */
    down: async (db) => {
        await db.query(`
            DROP TABLE activities;
        `);
    },
};