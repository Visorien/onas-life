import './ScheduleList.css';

import React from 'react';
import { ScheduleListItem } from './ScheduleListItem';

export const ScheduleList = ({ schedules, onOpen, onEdit, onDelete }) => {
    return <div className="schedule-list">
        {schedules.map(schedule => (
            <ScheduleListItem
                key={schedule.id}
                schedule={schedule}
                onOpen={onOpen}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </div>;
};
