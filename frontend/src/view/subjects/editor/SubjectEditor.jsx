import './SubjectEditor.css';

import React from 'react';
import Select from 'react-select';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Subject } from '../../../model/entities/Subject';
import { useForm } from '../../hooks/useForm';
import { Employee } from '../../../model/entities/Employee';

export const SubjectEditor = () => {
    const { history, match } = useReactRouter();
    const subjectId = match.params.id;

    const [employees, setEmployees] = React.useState([]);
    const employeeOptions = React.useMemo(() => (
        employees.map(employee => ({ label: employee.fullName, value: employee.id }))
    ), [employees]);

    function handleBack() {
        history.push('/subjects');
    }

    async function handleSubmitSubject() {
        await ApiService.post(
            subjectId ? `/subjects/${subjectId}` : '/subjects',
            {
                body: {
                    teacherEmployeeId: values.teacherEmployeeId,
                    shortName: values.shortName,
                    fullName: values.fullName,
                },
                model: Subject
            }
        );

        history.push('/subjects');
    }

    const {
        validated,
        values, setValues,
        createInput, createSelect,
        handleFormSubmit
    } = useForm({
        teacherEmployeeId: { type: Number, options: employeeOptions },
        shortName: { type: String },
        fullName: { type: String },
    }, handleSubmitSubject);

    useAsyncEffect(async () => {
        const employees = await ApiService.get(`/employees`, { model: Employee });
        setEmployees(employees);
    }, [setEmployees]);

    useAsyncEffect(async () => {
        if (!subjectId) return;
        const subject = await ApiService.get(`/subjects/${subjectId}`, { model: Subject });

        setValues({
            teacherEmployeeId: subject.teacherEmployeeId,
            shortName: subject.shortName,
            fullName: subject.fullName,
        });
    }, [subjectId, setValues]);

    return <>
        <div className="app__content subject-editor">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
            </ButtonGroup>

            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group controlId="fullName">
                    <Form.Control
                        {...createInput('fullName')}
                        type="text"
                        placeholder="Найменування"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="shortName">
                    <Form.Control
                        {...createInput('shortName')}
                        type="text"
                        placeholder="Короткое найменування предмета / аббревиатура"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="teacherEmployeeId">
                    <Select
                        {...createSelect('teacherEmployeeId', { placeholder: 'Викладач' })}
                        noOptionsMessage={() => 'Не знайдено'}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Зберегти
                </Button>
            </Form>
        </div>
    </>;
};
