import './GroupList.css';

import React from 'react';
import { GroupListItem } from './GroupListItem';

export const GroupList = ({ groups, onOpenSchedule, onEdit, onDelete }) => {
    return <div className="group-list">
        {groups.map(group => (
            <GroupListItem
                key={group.id}
                group={group}
                onOpenSchedule={onOpenSchedule}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </div>;
};
