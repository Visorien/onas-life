/** @typedef {import('pg').Pool} PgPool */

module.exports = {
    /** @param {PgPool} db */
    up: async (db) => {
        await db.query(`
            CREATE TABLE specialities (
                id SERIAL PRIMARY KEY,
                chair_id INTEGER NOT NULL,
                name varchar(180) NOT NULL
            );
        `);
    },

    /** @param {PgPool} db */
    down: async (db) => {
        await db.query(`
            DROP TABLE specialities;
        `);
    },
};