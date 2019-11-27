import './SubjectList.css';

import React from 'react';
import { SubjectListItem } from './SubjectListItem';

export const SubjectList = ({ subjects, onEdit, onDelete }) => {
    return <div className="subject-list">
        {subjects.map(subject => (
            <SubjectListItem
                key={subject.id}
                subject={subject}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </div>;
};
