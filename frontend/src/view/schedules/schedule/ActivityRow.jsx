import './ActivityRow.css';

import React from 'react';
import { Button } from 'react-bootstrap';
import useMedia from 'use-media';
import classnames from 'classnames';
import { ActivityForm } from './ActivityForm';
import { Week } from '../../../model/enums/Week';
import { ActivityType } from '../../../model/enums/ActivityType';

const ACTIVITY_TIMESTAMPS = [
    { startsAt: '8:00', endsAt: '9:20' },
    { startsAt: '9:45', endsAt: '11:05' },
    { startsAt: '11:30', endsAt: '12:50' },
    { startsAt: '13:15', endsAt: '14:35' },
    { startsAt: '15:00', endsAt: '16:20' },
    { startsAt: '16:45', endsAt: '18:05' },
    { startsAt: '18:30', endsAt: '19:50' },
];

const DAY_TRANSLATIONS = {
    'monday': 'Понеділок',
    'tuesday': 'Вівторок',
    'wednesday': 'Середа',
    'thursday': 'Четвер',
    'friday': 'П\'ятниця',
    'saturday': 'Субота',
};

const DAY_SHORT_TRANSLATIONS = {
    'monday': 'Пн',
    'tuesday': 'Вт',
    'wednesday': 'Ср',
    'thursday': 'Чт',
    'friday': 'Пт',
    'saturday': 'Сб',
};

const WEEK_TRANSLATIONS = {
    [Week.ODD]: 'непар',
    [Week.EVEN]: 'пар',
};

const ACTIVITY_TYPE_TRANSLATIONS = {
    [ActivityType.ASRS]: 'АСРС',
    [ActivityType.LAB]: 'Лаб. робота',
    [ActivityType.LECTURE]: 'Лекція',
    [ActivityType.PRACTICE_LAB]: 'Практика, лаб. робота',
    [ActivityType.PRACTICE]: 'Практика',
};

const CUSTOM_WEEK_PREFIX = 'т. ';

export const ActivityRow = ({
    editModeEnabled = false,
    availableWeekOptions,
    showDay = false,
    showTimestamp = false,
    enableEveryWeekSelection = true,
    dayActivityCount, indexActivitiesCount,
    activity,
    employees, subjects,
    onSubmit, onDelete
}) => {
    const isCompact = useMedia({ maxWidth: 820 });
    const dayTranslations = React.useMemo(() => (
        isCompact ? DAY_SHORT_TRANSLATIONS : DAY_TRANSLATIONS
    ), [isCompact]);

    const timestamp = React.useMemo(
        () => ACTIVITY_TIMESTAMPS[activity.index],
        [activity]
    );

    const subject = React.useMemo(
        () => activity.id && subjects.find(s => s.id === activity.subjectId),
        [activity, subjects]
    );

    const employee = React.useMemo(
        () => (activity.id && employees.find(
            employee => (
                employee.id === activity.teacherEmployeeId ||
                (subject && employee.id === subject.teacherEmployeeId)
            )
        )),
        [activity, employees, subject]
    );

    const handleDelete = React.useCallback(() => {
        if (activity.id && onDelete) {
            onDelete(activity);
        }
    }, [activity, onDelete]);

    let weekInfo;
    if (activity.week === Week.EVEN || activity.week === Week.ODD) {
        weekInfo = WEEK_TRANSLATIONS[activity.week];
    } else if (activity.week === Week.CUSTOM) {
        weekInfo = CUSTOM_WEEK_PREFIX + activity.weeks.join(', ');
    }

    return <tr className={classnames({
        'schedule__activity-row': true,
        'schedule__activity-row--first-index': showDay,
    })}>
        {showDay && <td
            className="fit center"
            rowSpan={dayActivityCount}>
            <b>{dayTranslations[activity.day]}</b>
        </td>}

        {showTimestamp && <td
            className="fit center"
            rowSpan={indexActivitiesCount}>
            {isCompact ? (<>
                <b>{timestamp.startsAt}</b>
                <br/>
                <b>{timestamp.endsAt}</b>
            </>) : (
                <b>{timestamp.startsAt} - {timestamp.endsAt}</b>
            )}
        </td>}

        <td className={classnames(
            'schedule__activity-cell',
            `schedule__activity-cell--week-${activity.week}`,
        )}>
            <div className="schedule__activity">
                {activity.id ? (<>
                    <div className="schedule__activity__info">
                        <p className="schedule__activity__subject">
                            {(subject && subject.name) || activity.subjectId}
                        </p>
                        <p>{(employee && employee.fullName) || activity.teacherEmployeeId || 'Викладача не вказано'}</p>
                        <p className="schedule__activity__place">{[
                            ACTIVITY_TYPE_TRANSLATIONS[activity.type],
                            weekInfo && `(${weekInfo})`,
                        ].filter(Boolean).join(' ')}, {activity.place}</p>
                    </div>
                    
                    {editModeEnabled && <div className="schedule__activity__actions">
                        <Button variant="outline-danger" onClick={handleDelete}>X</Button>
                    </div>}
                </>) : (
                    onSubmit && <ActivityForm
                        enableEveryWeekSelection={enableEveryWeekSelection}
                        availableWeekOptions={availableWeekOptions}
                        day={activity.day}
                        index={activity.index}
                        employees={employees}
                        subjects={subjects}
                        onSubmit={onSubmit}
                    />
                )}
            </div>
        </td>
    </tr>;
};