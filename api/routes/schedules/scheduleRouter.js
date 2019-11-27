import express from 'express';
import { search } from './search';
import { get } from './get';
import { create } from './create';
import { remove } from './remove';
import { update } from './update';
import { onlyAdmin } from '../middlewares';

export const schedulesRouter = express.Router();

schedulesRouter.get('/', search);
schedulesRouter.get('/:id', get);

schedulesRouter.use(onlyAdmin);
schedulesRouter.post('/', create);
schedulesRouter.post('/:id', update);
schedulesRouter.delete('/:id', remove);
