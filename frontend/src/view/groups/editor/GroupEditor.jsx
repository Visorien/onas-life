import './GroupEditor.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Group } from '../../../model/entities/Group';
import { useForm } from '../../hooks/useForm';
import { Grade } from '../../../model/entities/Grade';
import { Schedule } from '../../../model/entities/Schedule';

export const GroupEditor = () => {
    const { history, match } = useReactRouter();
    const groupId = match.params.id;

    const [grades, setGrades] = React.useState([]);
    const [schedules, setSchedules] = React.useState([]);

    function handleBack() {
        history.push('/groups');
    }

    async function handleSubmitGroup() {
        await ApiService.post(
            groupId ? `/groups/${groupId}` : '/groups',
            {
                body: {
                    scheduleId: values.scheduleId,
                    gradeId: values.gradeId,
                    name: values.name,
                },
                model: Group
            }
        );

        history.push('/groups');
    }

    const {
        validated,
        values, setValues,
        createInput, handleFormSubmit
    } = useForm({
        scheduleId: { type: Number },
        gradeId: { type: Number },
        name: { type: String },
    }, handleSubmitGroup);

    useAsyncEffect(async () => {
        const grades = await ApiService.get(`/grades`, { model: Grade });
        const schedules = await ApiService.get(`/schedules`, { model: Schedule });

        setGrades(grades);
        setSchedules(schedules);
    }, [setGrades, setSchedules]);

    useAsyncEffect(async () => {
        if (!groupId) return;
        const group = await ApiService.get(`/groups/${groupId}`, { model: Group });

        setValues({
            scheduleId: group.scheduleId,
            gradeId: group.gradeId,
            name: group.name,
        });
    }, [groupId, setValues]);

    return <>
        <div className="app__content group-editor">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
            </ButtonGroup>

            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group controlId="name">
                    <Form.Control
                        {...createInput('name')}
                        type="text"
                        placeholder="Код групи"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="gradeId">
                    <Form.Control as="select" {...createInput('gradeId')} required>
                        <option value="">Навчальний потік</option>
                        {grades.map(grade => (
                            <option
                                key={grade.id}
                                value={grade.id}>{grade.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="scheduleId">
                    <Form.Control as="select" {...createInput('scheduleId')}>
                        <option value="">Розклад</option>
                        {schedules.map(schedule => (
                            <option
                                key={schedule.id}
                                value={schedule.id}>{schedule.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Зберегти
                </Button>
            </Form>
        </div>
    </>;
};
