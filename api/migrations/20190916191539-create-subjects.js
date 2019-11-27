/** @typedef {import('pg').Pool} PgPool */

module.exports = {
    /** @param {PgPool} db */
    up: async (db) => {
        await db.query(`
            CREATE TABLE subjects (
                id SERIAL PRIMARY KEY,
                teacher_employee_id INTEGER,
                short_name varchar(120) NOT NULL,
                full_name varchar(120) NOT NULL
            );
        `);
    },

    /** @param {PgPool} db */
    down: async (db) => {
        await db.query(`
            DROP TABLE subjects;
        `);
    },
};