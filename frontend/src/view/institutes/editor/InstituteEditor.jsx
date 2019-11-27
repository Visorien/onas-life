import './InstituteEditor.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Institute } from '../../../model/entities/Institute';
import { useForm } from '../../hooks/useForm';

export const InstituteEditor = () => {
    const { history, match } = useReactRouter();
    const instituteId = match.params.id;

    function handleBack() {
        history.push('/institutes');
    }

    async function handleSubmitInstitute() {
        await ApiService.post(
            instituteId ? `/institutes/${instituteId}` : '/institutes',
            {
                body: {
                    name: values.name,
                },
                model: Institute
            }
        );

        history.push('/institutes');
    }

    const {
        validated,
        values, setValues,
        createInput, handleFormSubmit
    } = useForm({
        name: { type: String },
    }, handleSubmitInstitute);

    useAsyncEffect(async () => {
        if (!instituteId) return;
        const institute = await ApiService.get(`/institutes/${instituteId}`, { model: Institute });

        setValues({
            name: institute.name,
        });
    }, [instituteId, setValues]);

    return <>
        <div className="app__content institute-editor">
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
