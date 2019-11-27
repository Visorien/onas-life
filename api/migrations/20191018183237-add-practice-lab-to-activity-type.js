/** @typedef {import('pg').Pool} PgPool */

module.exports = {
    /** @param {PgPool} db */
    up: async (db) => {
        await db.query(`
            ALTER TYPE ACTIVITY_TYPE ADD VALUE 'practice-lab';
        `);
    },

    /** @param {PgPool} db */
    down: async (db) => {
        // stub
    },
};