import './EmployeesPage.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import { Button, ButtonGroup } from 'react-bootstrap';
import { EmployeeList } from './list/EmployeeList';
import { Employee } from '../../model/entities/Employee';
import { ApiService } from '../../services/ApiService';
import { ConfirmDeleteDialog } from '../shared/ConfirmDeleteDialog';
import { useAsyncEffect } from 'use-async-effect';
import { AuthService } from '../../services/AuthService';

export const EmployeesPage = () => {
    const { history } = useReactRouter();
    const [employees, setEmployees] = React.useState([]);

    const [employeeToDelete, setEmployeeToDelete] = React.useState(null);
    
    useAsyncEffect(async () => {
        const employees = await ApiService.get('/employees', { model: Employee });
        setEmployees(employees);
    }, [setEmployees]);

    function handleBack() {
        history.push('/');
    }

    function handleAdd() {
        history.push('/employees/add');
    }

    function handleEdit(employee) {
        history.push(`/employees/${employee.id}`);
    }

    async function handleDelete() {
        await ApiService.remove(`/employees/${employeeToDelete.id}`);
        setEmployees(employees.filter(e => e.id !== employeeToDelete.id));
        setEmployeeToDelete(null);
    }
    
    return <>
        <ConfirmDeleteDialog
            show={employeeToDelete !== null}
            onClose={() => setEmployeeToDelete(null)}
            onConfirm={handleDelete}
        />

        <div className="app__content employees-page">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
                {AuthService.isAuthenticated && <Button variant="primary" onClick={handleAdd}>Додати</Button>}
            </ButtonGroup>

            <EmployeeList
                employees={employees}
                onEdit={handleEdit}
                onDelete={e => setEmployeeToDelete(e)}
            />
        </div>
    </>;
};
