import fs from 'fs';
import log4js from 'log4js';
import pg from 'pg';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { rootRouter } from './routes/rootRouter';

log4js.configure({
    appenders: {
        console: { type: 'console' }
    },
    categories: {
        default: {
            appenders: ['console'],
            level: 'all'
        }
    }
});

const logger = log4js.getLogger('app');

function attachSqlLogging() {
    const submit = pg.Query.prototype.submit;
    pg.Query.prototype.submit = function () {
        // @ts-ignore
        const text = this.text;
        // @ts-ignore
        const values = this.values || [];
        const query = text.replace(/\$([0-9]+)/g, (m, v) => JSON.stringify(values[parseInt(v) - 1]));
        logger.debug('SQL query:', '\n\t' + query.split(/\n/).join('\n\t'));
        submit.apply(this, arguments);
    };
}

(async () => {
    logger.info('Starting application');

    attachSqlLogging();

    const app = express();
    app.use(cors({
        origin: process.env.APP_ORIGINS.split(',')
    }));
    app.use(bodyParser.json());

    const packageJson = JSON.parse(
        fs.readFileSync('./package.json', { encoding: 'utf8' })
    );
    app.get('/version', (req, res) => {
        res.json({
            author: packageJson.author,
            version: packageJson.version,
        });
    });

    app.use(rootRouter);

    const server = app.listen(Number(process.env.PORT) || 3001, '0.0.0.0', () => {
        // @ts-ignore
        logger.info('Application is listening on', server.address().port);
        logger.info('App origins:', ...process.env.APP_ORIGINS.split(','));
    });
})();
