import express from 'express';
import { search } from './search';
import { get } from './get';
import { create } from './create';
import { remove } from './remove';
import { update } from './update';
import { onlyAdmin } from '../middlewares';

export const specializationsRouter = express.Router();

specializationsRouter.get('/', search);
specializationsRouter.get('/:id', get);

specializationsRouter.use(onlyAdmin);
specializationsRouter.post('/', create);
specializationsRouter.post('/:id', update);
specializationsRouter.delete('/:id', remove);
