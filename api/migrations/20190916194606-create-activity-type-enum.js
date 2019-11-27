/** @typedef {import('pg').Pool} PgPool */

module.exports = {
    /** @param {PgPool} db */
    up: async (db) => {
        await db.query(`
            CREATE TYPE ACTIVITY_TYPE AS ENUM ('lecture', 'practice', 'lab', 'asrs');
        `);
    },

    /** @param {PgPool} db */
    down: async (db) => {
        await db.query(`
            DROP TYPE ACTIVITY_TYPE;
        `);
    },
};