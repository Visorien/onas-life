import './EmployeeList.css';

import React from 'react';
import { EmployeeListItem } from './EmployeeListItem';

export const EmployeeList = ({ employees, onEdit, onDelete }) => {
    return <div className="employee-list">
        {employees.map(employee => (
            <EmployeeListItem
                key={employee.id}
                employee={employee}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </div>;
};
