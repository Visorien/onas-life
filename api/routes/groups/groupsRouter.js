import express from 'express';
import { search } from './search';
import { get } from './get';
import { create } from './create';
import { remove } from './remove';
import { update } from './update';
import { onlyAdmin } from '../middlewares';

export const groupsRouter = express.Router();

groupsRouter.get('/', search);
groupsRouter.get('/:id', get);

groupsRouter.use(onlyAdmin);
groupsRouter.post('/', create);
groupsRouter.post('/:id', update);
groupsRouter.delete('/:id', remove);
