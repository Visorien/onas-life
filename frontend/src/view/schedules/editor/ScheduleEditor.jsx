import './ScheduleEditor.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Schedule } from '../../../model/entities/Schedule';
import { useForm } from '../../hooks/useForm';

export const ScheduleEditor = () => {
    const { history, match } = useReactRouter();
    const scheduleId = match.params.id;

    function handleBack() {
        history.push('/schedules');
    }

    async function handleSubmitSchedule() {
        await ApiService.post(
            scheduleId ? `/schedules/${scheduleId}` : '/schedules',
            {
                body: {
                    name: values.name,
                },
                model: Schedule
            }
        );

        history.push('/schedules');
    }

    const {
        validated,
        values, setValues,
        createInput, handleFormSubmit
    } = useForm({
        name: { type: String },
    }, handleSubmitSchedule);

    useAsyncEffect(async () => {
        if (!scheduleId) return;
        const schedule = await ApiService.get(`/schedules/${scheduleId}`, { model: Schedule });

        console.log(schedule)
        setValues({
            name: schedule.name,
        });
    }, [scheduleId, setValues]);

    return <>
        <div className="app__content schedule-editor">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
            </ButtonGroup>

            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group controlId="name">
                    <Form.Control
                        {...createInput('name')}
                        type="text"
                        placeholder="Найменування"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Зберегти
                </Button>
            </Form>
        </div>
    </>;
};
