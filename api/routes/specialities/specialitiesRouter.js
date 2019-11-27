import express from 'express';
import { search } from './search';
import { get } from './get';
import { create } from './create';
import { remove } from './remove';
import { update } from './update';
import { onlyAdmin } from '../middlewares';

export const specialitiesRouter = express.Router();

specialitiesRouter.get('/', search);
specialitiesRouter.get('/:id', get);

specialitiesRouter.use(onlyAdmin);
specialitiesRouter.post('/', create);
specialitiesRouter.post('/:id', update);
specialitiesRouter.delete('/:id', remove);
