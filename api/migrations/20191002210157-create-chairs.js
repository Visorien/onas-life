/** @typedef {import('pg').Pool} PgPool */

module.exports = {
    /** @param {PgPool} db */
    up: async (db) => {
        await db.query(`
            CREATE TABLE chairs (
                id SERIAL PRIMARY KEY,
                institute_id INTEGER NOT NULL,
                head_employee_id INTEGER,
                name varchar(180) NOT NULL
            );
        `);
    },

    /** @param {PgPool} db */
    down: async (db) => {
        await db.query(`
            DROP TABLE chairs;
        `);
    },
};