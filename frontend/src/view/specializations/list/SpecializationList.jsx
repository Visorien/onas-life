import './SpecializationList.css';

import React from 'react';
import { SpecializationListItem } from './SpecializationListItem';

export const SpecializationList = ({ specializations, onEdit, onDelete }) => {
    return <div className="specialization-list">
        {specializations.map(specialization => (
            <SpecializationListItem
                key={specialization.id}
                specialization={specialization}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </div>;
};
