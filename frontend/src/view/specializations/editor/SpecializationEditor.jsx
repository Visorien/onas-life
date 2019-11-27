import './SpecializationEditor.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Specialization } from '../../../model/entities/Specialization';
import { useForm } from '../../hooks/useForm';
import { Speciality } from '../../../model/entities/Speciality';
import { Degree } from '../../../model/enums/Degree';

const DEGREE_TRANSLATIONS = {
    [Degree.MASTER]: 'Магістр',
    [Degree.BACHELOR]: 'Бакалавр',
};

export const SpecializationEditor = () => {
    const { history, match } = useReactRouter();
    const specializationId = match.params.id;

    const [specialities, setSpecialities] = React.useState([]);

    function handleBack() {
        history.push('/specializations');
    }

    async function handleSubmitSpecialization() {
        await ApiService.post(
            specializationId ? `/specializations/${specializationId}` : '/specializations',
            {
                body: {
                    specialityId: values.specialityId,
                    degree: values.degree,
                    name: values.name,
                },
                model: Specialization
            }
        );

        history.push('/specializations');
    }

    const {
        validated,
        values, setValues,
        createInput, handleFormSubmit
    } = useForm({
        specialityId: { type: Number },
        degree: { type: String },
        name: { type: String },
    }, handleSubmitSpecialization);

    useAsyncEffect(async () => {
        const specialities = await ApiService.get(`/specialities`, { model: Speciality });
        setSpecialities(specialities);
    }, [setSpecialities]);

    useAsyncEffect(async () => {
        if (!specializationId) return;
        const specialization = await ApiService.get(`/specializations/${specializationId}`, { model: Specialization });

        setValues({
            specialityId: specialization.specialityId,
            degree: specialization.degree,
            name: specialization.name,
        });
    }, [specializationId, setValues]);

    return <>
        <div className="app__content specialization-editor">
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

                <Form.Group controlId="specialityId">
                    <Form.Control as="select" {...createInput('specialityId')} required>
                        <option value="">Спеціальність</option>
                        {specialities.map(speciality => (
                            <option
                                key={speciality.id}
                                value={speciality.id}>{speciality.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="degree">
                    <Form.Control as="select" {...createInput('degree')}>
                        <option value="">Рівень освіти</option>
                        {Object.values(Degree).map(degree => (
                            <option
                                key={degree}
                                value={degree}>{DEGREE_TRANSLATIONS[degree]}
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
