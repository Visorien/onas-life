import './SpecialityList.css';

import React from 'react';
import { SpecialityListItem } from './SpecialityListItem';

export const SpecialityList = ({ specialities, onEdit, onDelete }) => {
    return <div className="speciality-list">
        {specialities.map(speciality => (
            <SpecialityListItem
                key={speciality.id}
                speciality={speciality}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </div>;
};
