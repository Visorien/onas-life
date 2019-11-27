import './InstituteList.css';

import React from 'react';
import { InstituteListItem } from './InstituteListItem';

export const InstituteList = ({ institutes, onEdit, onDelete }) => {
    return <div className="institute-list">
        {institutes.map(institute => (
            <InstituteListItem
                key={institute.id}
                institute={institute}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </div>;
};
