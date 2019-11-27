import './GradeList.css';

import React from 'react';
import { GradeListItem } from './GradeListItem';

export const GradeList = ({ grades, onEdit, onDelete }) => {
    return <div className="grade-list">
        {grades.map(grade => (
            <GradeListItem
                key={grade.id}
                grade={grade}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </div>;
};
