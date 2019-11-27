/** @typedef {import('pg').Pool} PgPool */

module.exports = {
    /** @param {PgPool} db */
    up: async (db) => {
        await db.query(`
            CREATE TABLE employees (
                id SERIAL PRIMARY KEY,
                first_name varchar(120) NOT NULL,
                last_name varchar(120) NOT NULL,
                middle_name varchar(120) NOT NULL,
                phone_number varchar(13),
                email varchar(255)
            );
        `);
    },

    /** @param {PgPool} db */
    down: async (db) => {
        await db.query(`
            DROP TABLE employees;
        `);
    },
};