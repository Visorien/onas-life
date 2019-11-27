import './ChairEditor.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Chair } from '../../../model/entities/Chair';
import { useForm } from '../../hooks/useForm';
import { Institute } from '../../../model/entities/Institute';

export const ChairEditor = () => {
    const { history, match } = useReactRouter();
    const chairId = match.params.id;

    const [institutes, setInstitutes] = React.useState([]);

    function handleBack() {
        history.push('/chairs');
    }

    async function handleSubmitChair() {
        await ApiService.post(
            chairId ? `/chairs/${chairId}` : '/chairs',
            {
                body: {
                    instituteId: values.instituteId,
                    name: values.name,
                },
                model: Chair
            }
        );

        history.push('/chairs');
    }

    const {
        validated,
        values, setValues,
        createInput, handleFormSubmit
    } = useForm({
        instituteId: { type: Number },
        name: { type: String },
    }, handleSubmitChair);

    useAsyncEffect(async () => {
        const institutes = await ApiService.get(`/institutes`, { model: Institute });
        setInstitutes(institutes);
    }, [setInstitutes]);

    useAsyncEffect(async () => {
        if (!chairId) return;
        const chair = await ApiService.get(`/chairs/${chairId}`, { model: Chair });

        setValues({
            instituteId: chair.instituteId,
            name: chair.name,
        });
    }, [chairId, setValues]);

    return <>
        <div className="app__content chair-editor">
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

                <Form.Group controlId="instituteId">
                    <Form.Control as="select" {...createInput('instituteId')} required>
                        <option value="">Інститут</option>
                        {institutes.map(institute => (
                            <option
                                key={institute.id}
                                value={institute.id}>{institute.name}
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
