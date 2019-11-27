import express from 'express';
import { search } from './search';
import { get } from './get';
import { create } from './create';
import { update } from './update';
import { remove } from './remove';
import { onlyAdmin } from '../middlewares';

export const activitiesRouter = express.Router();

activitiesRouter.get('/', search);
activitiesRouter.get('/:id', get);

activitiesRouter.use(onlyAdmin);
activitiesRouter.post('/', create);
activitiesRouter.post('/:id', update);
activitiesRouter.delete('/:id', remove);
