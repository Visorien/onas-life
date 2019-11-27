import React from 'react';
import { useAsyncEffect } from 'use-async-effect';
import { Card, Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Speciality } from '../../../model/entities/Speciality';
import { getSpecializationTitle } from '../getSpecializationTitle';
import { AuthService } from '../../../services/AuthService';

export const SpecializationListItem = ({ specialization, onEdit, onDelete }) => {
    const [speciality, setSpeciality] = React.useState();

    useAsyncEffect(async () => {
        if (!specialization.specialityId) return;

        const speciality = await ApiService.get(`/specialities/${specialization.specialityId}`, { model: Speciality });
        setSpeciality(speciality);
    }, [setSpeciality]);

    return <div className="specialization">
        <Card>
            <Card.Header as="h5">
                {getSpecializationTitle(specialization)}
            </Card.Header>

            <ListGroup variant="flush">
                <ListGroup.Item>
                    <b>Інститут:</b> {speciality ? speciality.name : specialization.specialityId || 'не вказано'}
                </ListGroup.Item>
            </ListGroup>

            {AuthService.isAuthenticated && <Card.Body>
                <ButtonGroup>
                    <Button variant="secondary" onClick={() => onEdit(specialization)}>
                        Відредагувати
                    </Button>

                    <Button variant="outline-danger" onClick={() => onDelete(specialization)}>
                        Видалити
                    </Button>
                </ButtonGroup>
            </Card.Body>}
        </Card>
    </div>;
};