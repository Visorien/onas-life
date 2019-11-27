/** @typedef {import('pg').Pool} PgPool */

module.exports = {
    /** @param {PgPool} db */
    up: async (db) => {
        await db.query(`
            CREATE TYPE WEEKDAY AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');
        `);
    },

    /** @param {PgPool} db */
    down: async (db) => {
        await db.query(`
            DROP TYPE WEEKDAY;
        `);
    },
};