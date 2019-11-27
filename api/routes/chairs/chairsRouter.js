import express from 'express';
import { search } from './search';
import { get } from './get';
import { create } from './create';
import { remove } from './remove';
import { update } from './update';
import { onlyAdmin } from '../middlewares';

export const chairsRouter = express.Router();

chairsRouter.get('/', search);
chairsRouter.get('/:id', get);

chairsRouter.use(onlyAdmin);
chairsRouter.post('/', create);
chairsRouter.post('/:id', update);
chairsRouter.delete('/:id', remove);
