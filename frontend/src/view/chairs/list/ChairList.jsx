import './ChairList.css';

import React from 'react';
import { ChairListItem } from './ChairListItem';

export const ChairList = ({ chairs, onEdit, onDelete }) => {
    return <div className="chair-list">
        {chairs.map(chair => (
            <ChairListItem
                key={chair.id}
                chair={chair}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </div>;
};
