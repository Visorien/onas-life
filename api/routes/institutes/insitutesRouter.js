import express from 'express';
import { search } from './search';
import { get } from './get';
import { create } from './create';
import { remove } from './remove';
import { update } from './update';
import { onlyAdmin } from '../middlewares';

export const institutesRouter = express.Router();

institutesRouter.get('/', search);
institutesRouter.get('/:id', get);

institutesRouter.use(onlyAdmin);
institutesRouter.post('/', create);
institutesRouter.post('/:id', update);
institutesRouter.delete('/:id', remove);
