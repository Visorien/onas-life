import './App.css';
import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';

import { Sidebar } from './navigation/Sidebar';

import { LoginPage } from './login/LoginPage';
import { DashboardPage } from './dashboard/DashboardPage';

import { SchedulesPage } from './schedules/SchedulesPage';
import { SchedulePage } from './schedules/schedule/SchedulePage';

import { EmployeesPage } from './employees/EmployeesPage';
import { EmployeeEditor } from './employees/editor/EmployeeEditor';

import { SubjectEditor } from './subjects/editor/SubjectEditor';
import { SubjectsPage } from './subjects/SubjectsPage';

import { InstitutesPage } from './institutes/InstitutesPage';
import { InstituteEditor } from './institutes/editor/InstituteEditor';

import { ChairEditor } from './chairs/editor/ChairEditor';
import { ChairsPage } from './chairs/ChairsPage';

import { SpecialitiesPage } from './specialities/SpecialitiesPage';
import { SpecialityEditor } from './specialities/editor/SpecialityEditor';

import { SpecializationsPage } from './specializations/SpecializationsPage';
import { SpecializationEditor } from './specializations/editor/SpecializationEditor';

import { GradesPage } from './grades/GradesPage';
import { GradeEditor } from './grades/editor/GradeEditor';

import { GroupsPage } from './groups/GroupsPage';
import { GroupEditor } from './groups/editor/GroupEditor';
import { ScheduleEditor } from './schedules/editor/ScheduleEditor';
import { ApiService } from '../services/ApiService';

import packageJson from '../../package.json';

export const App = () => {
    useAsyncEffect(async () => {
        console.log(
            'Client info:',
            { author: packageJson.author, version: packageJson.version }
        );
        console.log(
            'Server info:',
            await ApiService.get('/version')
        );
    });

    return <>
        <HashRouter basename="/">
            <div className="app">
                <div className="sidebar-wrapper"><Sidebar /></div>
                <Switch>
                    <Route exact path="/" component={() => <Redirect to="/dashboard"/>}/>

                    <Route path="/login" component={LoginPage}/>
                    <Route path="/dashboard" component={DashboardPage}/>
                    
                    <Route exact path="/schedules" component={SchedulesPage}/>
                    <Route exact path="/schedules/add" component={ScheduleEditor}/>
                    <Route exact path="/schedules/:id/edit" component={ScheduleEditor}/>
                    <Route path="/schedules/:id" component={SchedulePage}/>

                    <Route exact path="/employees" component={EmployeesPage}/>
                    <Route exact path="/employees/add" component={EmployeeEditor}/>
                    <Route path="/employees/:id" component={EmployeeEditor}/>
                    
                    <Route exact path="/subjects" component={SubjectsPage}/>
                    <Route exact path="/subjects/add" component={SubjectEditor}/>
                    <Route path="/subjects/:id" component={SubjectEditor}/>

                    <Route exact path="/institutes" component={InstitutesPage}/>
                    <Route exact path="/institutes/add" component={InstituteEditor}/>
                    <Route path="/institutes/:id" component={InstituteEditor}/>

                    <Route exact path="/chairs" component={ChairsPage}/>
                    <Route exact path="/chairs/add" component={ChairEditor}/>
                    <Route path="/chairs/:id" component={ChairEditor}/>

                    <Route exact path="/specialities" component={SpecialitiesPage}/>
                    <Route exact path="/specialities/add" component={SpecialityEditor}/>
                    <Route path="/specialities/:id" component={SpecialityEditor}/>

                    <Route exact path="/specializations" component={SpecializationsPage}/>
                    <Route exact path="/specializations/add" component={SpecializationEditor}/>
                    <Route path="/specializations/:id" component={SpecializationEditor}/>

                    <Route exact path="/grades" component={GradesPage}/>
                    <Route exact path="/grades/add" component={GradeEditor}/>
                    <Route path="/grades/:id" component={GradeEditor}/>

                    <Route exact path="/groups" component={GroupsPage}/>
                    <Route exact path="/groups/add" component={GroupEditor}/>
                    <Route path="/groups/:id" component={GroupEditor}/>
                </Switch>
            </div>
        </HashRouter>
    </>;
};
