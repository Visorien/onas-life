import './EmployeeEditor.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Employee } from '../../../model/entities/Employee';
import { useForm } from '../../hooks/useForm';
import { useAsyncEffect } from 'use-async-effect';

export const EmployeeEditor = () => {
    const { history, match } = useReactRouter();
    const employeeId = match.params.id;

    function handleBack() {
        history.push('/employees');
    }

    async function handleSubmit(values) {
        await ApiService.post(employeeId ? `/employees/${employeeId}` : '/employees', {
            body: {
                firstName: values.firstName,
                lastName: values.lastName,
                middleName: values.middleName,
                phoneNumber: values.phoneNumber,
                email: values.email,
            },
            model: Employee
        });

        history.push('/employees');
    }

    const { setValues, validated, createInput, handleFormSubmit } = useForm({
        firstName: { type: String },
        lastName: { type: String },
        middleName: { type: String },
        phoneNumber: { type: String },
        email: { type: String },
    }, handleSubmit);

    useAsyncEffect(async () => {
        if (!employeeId) return;
        const employee = await ApiService.get(`/employees/${employeeId}`, { model: Employee });
        
        setValues({
            firstName: employee.firstName,
            lastName: employee.lastName,
            middleName: employee.middleName,
            phoneNumber: employee.phoneNumber,
            email: employee.email,
        });
    }, [employeeId, setValues]);

    return <>
        <div className="app__content employee-editor">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
            </ButtonGroup>

            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group controlId="lastName">
                    <Form.Control {...createInput('lastName')}
                        type="text" placeholder="Прізвище" required/>
                </Form.Group>
                <Form.Group controlId="firstName">
                    <Form.Control {...createInput('firstName')}
                        type="text" placeholder="Ім'я" required/>
                </Form.Group>
                <Form.Group controlId="middleName">
                    <Form.Control {...createInput('middleName')}
                        type="text" placeholder="По-батькові" required/>
                </Form.Group>
                <Form.Group controlId="phoneNumber">
                    <Form.Control {...createInput('phoneNumber')}
                        type="text" placeholder="Номер телефону"/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Control {...createInput('email')}
                        type="email" placeholder="E-mail адрес"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Зберегти
                </Button>
            </Form>
        </div>
    </>;
};
