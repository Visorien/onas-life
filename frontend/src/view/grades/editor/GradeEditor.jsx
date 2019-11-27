import './GradeEditor.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Grade } from '../../../model/entities/Grade';
import { useForm } from '../../hooks/useForm';
import { Specialization } from '../../../model/entities/Specialization';
import { getSpecializationTitle } from '../../specializations/getSpecializationTitle';

export const GradeEditor = () => {
    const { history, match } = useReactRouter();
    const gradeId = match.params.id;

    const [specializations, setSpecializations] = React.useState([]);

    function handleBack() {
        history.push('/grades');
    }

    async function handleSubmitGrade() {
        await ApiService.post(
            gradeId ? `/grades/${gradeId}` : '/grades',
            {
                body: {
                    specializationId: values.specializationId,
                    name: values.name,
                },
                model: Grade
            }
        );

        history.push('/grades');
    }

    const {
        validated,
        values, setValues,
        createInput, handleFormSubmit
    } = useForm({
        specializationId: { type: Number },
        name: { type: String },
    }, handleSubmitGrade);

    useAsyncEffect(async () => {
        const specializations = await ApiService.get(`/specializations`, { model: Specialization });
        setSpecializations(specializations);
    }, [setSpecializations]);

    useAsyncEffect(async () => {
        if (!gradeId) return;
        const grade = await ApiService.get(`/grades/${gradeId}`, { model: Grade });

        setValues({
            specializationId: grade.specializationId,
            name: grade.name,
        });
    }, [gradeId, setValues]);

    return <>
        <div className="app__content grade-editor">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
            </ButtonGroup>

            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group controlId="name">
                    <Form.Control
                        {...createInput('name')}
                        type="text"
                        placeholder="Код"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="specializationId">
                    <Form.Control as="select" {...createInput('specializationId')} required>
                        <option value="">Спеціалізація</option>
                        {specializations.map(specialization => (
                            <option key={specialization.id} value={specialization.id}>
                                {getSpecializationTitle(specialization)}
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
