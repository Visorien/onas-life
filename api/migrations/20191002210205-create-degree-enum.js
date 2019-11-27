/** @typedef {import('pg').Pool} PgPool */

module.exports = {
    /** @param {PgPool} db */
    up: async (db) => {
        await db.query(`
            CREATE TYPE DEGREE AS ENUM ('bachelor', 'master');
        `);
    },

    /** @param {PgPool} db */
    down: async (db) => {
        await db.query(`
            DROP TYPE DEGREE;
        `);
    },
};