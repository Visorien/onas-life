/** @typedef {import('pg').Pool} PgPool */

module.exports = {
    /** @param {PgPool} db */
    up: async (db) => {
        await db.query(`
            CREATE TABLE groups (
                id SERIAL PRIMARY KEY,
                schedule_id INTEGER,
                grade_id INTEGER NOT NULL,
                name varchar(180) NOT NULL
            );
        `);
    },

    /** @param {PgPool} db */
    down: async (db) => {
        await db.query(`
            DROP TABLE groups;
        `);
    },
};