import express from 'express';
import { search } from './search';
import { get } from './get';
import { create } from './create';
import { update } from './update';
import { remove } from './remove';
import { onlyAdmin } from '../middlewares';

export const employeesRouter = express.Router();

employeesRouter.get('/', search);
employeesRouter.get('/:id', get);

employeesRouter.use(onlyAdmin);
employeesRouter.post('/', create);
employeesRouter.post('/:id', update);
employeesRouter.delete('/:id', remove);
