import express from 'express';
import { search } from './search';
import { get } from './get';
import { create } from './create';
import { remove } from './remove';
import { update } from './update';
import { onlyAdmin } from '../middlewares';

export const gradesRouter = express.Router();

gradesRouter.get('/', search);
gradesRouter.get('/:id', get);

gradesRouter.use(onlyAdmin);
gradesRouter.post('/', create);
gradesRouter.post('/:id', update);
gradesRouter.delete('/:id', remove);
