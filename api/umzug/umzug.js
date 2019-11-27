const Umzug = require('umzug');

const PostgresStorage = require('./PostgresStorage');
const database = require('./database');

module.exports = new Umzug({
    storage: new PostgresStorage(database, 'migrations_meta'),

    migrations: {
        params: [database],
    },
});
