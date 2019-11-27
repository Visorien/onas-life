import './SchedulePage.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Table, Form, Button, ButtonGroup } from 'react-bootstrap';
import { Schedule } from '../../../model/entities/Schedule';
import { Activity } from '../../../model/entities/Activity';
import { Subject } from '../../../model/entities/Subject';
import { Employee } from '../../../model/entities/Employee';
import { ApiService } from '../../../services/ApiService';
import { ConfirmDeleteDialog } from '../../shared/ConfirmDeleteDialog';
import { ActivityRow } from './ActivityRow';
import { Week } from '../../../model/enums/Week';
import { ActivityType } from '../../../model/enums/ActivityType';
import { AuthService } from '../../../services/AuthService';
import { Day } from '../../../model/enums/Day';

const ACTIVITY_TIMESTAMPS = [
    { startsAt: '8:00', endsAt: '9:20' },
    { startsAt: '9:45', endsAt: '11:05' },
    { startsAt: '11:30', endsAt: '12:50' },
    { startsAt: '13:15', endsAt: '14:35' },
    { startsAt: '15:00', endsAt: '16:20' },
    { startsAt: '16:45', endsAt: '18:05' },
    { startsAt: '18:30', endsAt: '19:50' },
];

export const SchedulePage = () => {
    const { history, match } = useReactRouter();
    const scheduleId = Number(match.params.id);

    const [activityToDelete, setActivityToDelete] = React.useState(null);
    const [editModeEnabled, setEditModeEnabled] = React.useState(false);

    const [schedule, setSchedule] = React.useState();
    const [activities, setActivities] = React.useState([]);
    const [subjects, setSubjects] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);

    useAsyncEffect(async () => {
        const schedule = await ApiService.get(`/schedules/${scheduleId}`, { model: Schedule });
        const activities = await ApiService.get(`/activities`, { params: { scheduleId }, model: Activity });
        const subjects = await ApiService.get(`/subjects`, { model: Subject });
        const employees = await ApiService.get(`/employees`, { model: Employee });

        setSchedule(schedule);
        setActivities(activities);
        setSubjects(subjects);
        setEmployees(employees);

        setEditModeEnabled(AuthService.isAuthenticated && activities.length === 0);
    }, [scheduleId, setSchedule, setActivities, setSubjects, setEmployees, setEditModeEnabled]);

    function handleBack() {
        history.push('/schedules');
    }

    async function handleActivitySubmit(activityData) {
        const activity = await ApiService.post('/activities', {
            body: {
                scheduleId,
                subjectId: activityData.subjectId,
                teacherEmployeeId: activityData.teacherEmployeeId,
                type: activityData.type,
                place: activityData.place,
                week: activityData.week,
                weeks: activityData.weeks,
                day: activityData.day,
                index: activityData.index,
            }
        });

        setActivities([...activities, activity]);
    }

    async function handleDeleteActivity() {
        await ApiService.remove(`/activities/${activityToDelete.id}`);
        setActivities(activities.filter(a => a.id !== activityToDelete.id));
        setActivityToDelete(null);
    }

    function handleViewModeChange(event) {
        setEditModeEnabled(event.currentTarget.checked);
    }

    return <>
        <ConfirmDeleteDialog
            show={activityToDelete !== null}
            onClose={() => setActivityToDelete(null)}
            onConfirm={handleDeleteActivity}
        />
    
        <div className="app__content schedule-page">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
            </ButtonGroup>

            {(AuthService.isAuthenticated && activities.length > 0) && <Form.Check
                className="schedule-page__edit-mode-checkbox"
                type="checkbox"
                label="Режим редагування"
                checked={editModeEnabled}
                onChange={handleViewModeChange}
            />}
            
            {schedule && <Table bordered className="schedule__table">
                <tbody>
                    <tr>
                        <th className="fit center" colSpan={3}>{schedule.name}</th>
                    </tr>

                    <tr>
                        <th className="fit center">День</th>
                        <th className="fit center">Час</th>
                        <th className="fit center">Заняття</th>
                    </tr>

                    {Object.values(Day).flatMap(day => {
                        const indexActivities = new Array(ACTIVITY_TIMESTAMPS.length)
                            .fill(undefined)
                            .map((_, i) => (
                                activities.filter(activity => (
                                    activity.day === day &&
                                    activity.index === i
                                ))
                            ));
                        
                        if (editModeEnabled) {
                            // eslint-disable-next-line no-unused-vars
                            for (const [i, activities] of indexActivities.entries()) {
                                activities.push(
                                    new Activity({
                                        week: null,
                                        day,
                                        index: i,
                                        place: null,
                                        scheduleId: null,
                                        subjectId: null,
                                        type: ActivityType.LECTURE,
                                    })
                                );
                            }
                        }

                        const dayActivities = indexActivities.flat();
                        const indexActivityCount = indexActivities.map(a => a.length);

                        return dayActivities.map((activity, i) => {
                            const sameIndexActivities = indexActivities[activity.index];

                            const hasOddWeekActivities = sameIndexActivities.some(a => a.id && a.week === Week.ODD);
                            const hasEvenWeekActivities = sameIndexActivities.some(a => a.id && a.week === Week.EVEN);
                            const hasEveryWeekActivities = sameIndexActivities.some(a => a.id && a.week === Week.EVERY);

                            const availableWeekOptions = [];

                            if (!hasEveryWeekActivities) {
                                if (!hasEvenWeekActivities && !hasOddWeekActivities) {
                                    availableWeekOptions.push(Week.EVERY)
                                }

                                if (!hasEvenWeekActivities) {
                                    availableWeekOptions.push(Week.EVEN);
                                }

                                if (!hasOddWeekActivities) {
                                    availableWeekOptions.push(Week.ODD);
                                }
                            }

                            availableWeekOptions.push(Week.CUSTOM);

                            return <ActivityRow
                                key={'activity-' + (activity.id || (activity.week + activity.day + activity.index))}
                                showDay={i === 0}
                                showTimestamp={sameIndexActivities[0] === activity}
                                dayActivityCount={dayActivities.length}
                                editModeEnabled={editModeEnabled}
                                indexActivitiesCount={indexActivityCount[activity.index]}
                                activity={activity}
                                employees={employees}
                                subjects={subjects}
                                availableWeekOptions={availableWeekOptions}
                                onSubmit={handleActivitySubmit}
                                onDelete={a => setActivityToDelete(a)}
                            />
                        });
                    })}
                </tbody>
            </Table>}
        </div>
    </>;
};
