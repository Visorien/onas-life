import express from 'express';
import { subjectsRouter } from './subjects/subjectsRouter';
import { employeesRouter } from './employees/employeesRouter';
import { schedulesRouter } from './schedules/scheduleRouter';
import { activitiesRouter } from './activities/activitiesRouter';
import { institutesRouter } from './institutes/insitutesRouter';
import { chairsRouter } from './chairs/chairsRouter';
import { specialitiesRouter } from './specialities/specialitiesRouter';
import { specializationsRouter } from './specializations/specializationsRouter';
import { gradesRouter } from './grades/gradesRouter';
import { groupsRouter } from './groups/groupsRouter';
import { authenticateAdmin } from './middlewares';
import { legacyRouter } from './legacy/legacyRouter';

export const rootRouter = express.Router();

rootRouter.use(authenticateAdmin);
rootRouter.get('/auth-check', (req, res) => {
    res.status(200).json(req.isAdmin);
});

rootRouter.use('/legacy', legacyRouter);

rootRouter.use('/employees', employeesRouter);

rootRouter.use('/subjects', subjectsRouter);
rootRouter.use('/schedules', schedulesRouter);
rootRouter.use('/activities', activitiesRouter);

rootRouter.use('/institutes', institutesRouter);
rootRouter.use('/chairs', chairsRouter);
rootRouter.use('/specialities', specialitiesRouter);
rootRouter.use('/specializations', specializationsRouter);
rootRouter.use('/grades', gradesRouter);
rootRouter.use('/groups', groupsRouter);
