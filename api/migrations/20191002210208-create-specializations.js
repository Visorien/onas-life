/** @typedef {import('pg').Pool} PgPool */

module.exports = {
    /** @param {PgPool} db */
    up: async (db) => {
        await db.query(`
            CREATE TABLE specializations (
                id SERIAL PRIMARY KEY,
                speciality_id INTEGER NOT NULL,
                degree DEGREE,
                name varchar(180) NOT NULL
            );
        `);
    },

    /** @param {PgPool} db */
    down: async (db) => {
        await db.query(`
            DROP TABLE specializations;
        `);
    },
};