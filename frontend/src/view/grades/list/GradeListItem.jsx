import React from 'react';
import { useAsyncEffect } from 'use-async-effect';
import { Card, Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Specialization } from '../../../model/entities/Specialization';
import { getSpecializationTitle } from '../../specializations/getSpecializationTitle';
import { AuthService } from '../../../services/AuthService';

export const GradeListItem = ({ grade, onEdit, onDelete }) => {
    const [specialization, setSpecialization] = React.useState();

    useAsyncEffect(async () => {
        if (!grade.specializationId) return;

        const specialization = await ApiService.get(`/specializations/${grade.specializationId}`, { model: Specialization });
        setSpecialization(specialization);
    }, [setSpecialization]);

    return <div className="grade">
        <Card>
            <Card.Header as="h5">{grade.name}</Card.Header>

            <ListGroup variant="flush">
                <ListGroup.Item>
                    <b>Спеціалізація:</b> {
                        specialization
                            ? getSpecializationTitle(specialization)
                            : grade.specializationId
                        || 'не вказано'
                    }
                </ListGroup.Item>
            </ListGroup>

            {AuthService.isAuthenticated && <Card.Body>
                <ButtonGroup>
                    <Button variant="secondary" onClick={() => onEdit(grade)}>
                        Відредагувати
                    </Button>

                    <Button variant="outline-danger" onClick={() => onDelete(grade)}>
                        Видалити
                    </Button>
                </ButtonGroup>
            </Card.Body>}
        </Card>
    </div>;
};