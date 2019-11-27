import express from 'express';
import { search } from './search';
import { get } from './get';
import { create } from './create';
import { update } from './update';
import { remove } from './remove';
import { onlyAdmin } from '../middlewares';

export const subjectsRouter = express.Router();

subjectsRouter.get('/', search);
subjectsRouter.get('/:id', get);

subjectsRouter.use(onlyAdmin);
subjectsRouter.post('/', create);
subjectsRouter.post('/:id', update);
subjectsRouter.delete('/:id', remove);
