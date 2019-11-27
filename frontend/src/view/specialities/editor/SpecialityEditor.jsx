import './SpecialityEditor.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Speciality } from '../../../model/entities/Speciality';
import { useForm } from '../../hooks/useForm';
import { Chair } from '../../../model/entities/Chair';

export const SpecialityEditor = () => {
    const { history, match } = useReactRouter();
    const specialityId = match.params.id;

    const [chairs, setChairs] = React.useState([]);

    function handleBack() {
        history.push('/specialities');
    }

    async function handleSubmitSpeciality() {
        await ApiService.post(
            specialityId ? `/specialities/${specialityId}` : '/specialities',
            {
                body: {
                    chairId: values.chairId,
                    name: values.name,
                },
                model: Speciality
            }
        );

        history.push('/specialities');
    }

    const {
        validated,
        values, setValues,
        createInput, handleFormSubmit
    } = useForm({
        chairId: { type: Number },
        name: { type: String },
    }, handleSubmitSpeciality);

    useAsyncEffect(async () => {
        const chairs = await ApiService.get(`/chairs`, { model: Chair });
        setChairs(chairs);
    }, [setChairs]);

    useAsyncEffect(async () => {
        if (!specialityId) return;
        const speciality = await ApiService.get(`/specialities/${specialityId}`, { model: Speciality });

        setValues({
            chairId: speciality.chairId,
            name: speciality.name,
        });
    }, [specialityId, setValues]);

    return <>
        <div className="app__content speciality-editor">
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

                <Form.Group controlId="chairId">
                    <Form.Control as="select" {...createInput('chairId')} required>
                        <option value="">Кафедра</option>
                        {chairs.map(chair => (
                            <option
                                key={chair.id}
                                value={chair.id}>{chair.name}
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
