import React from 'react';
import { useAsyncEffect } from 'use-async-effect';
import { Card, Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Chair } from '../../../model/entities/Chair';
import { AuthService } from '../../../services/AuthService';

export const SpecialityListItem = ({ speciality, onEdit, onDelete }) => {
    const [chair, setChair] = React.useState();

    useAsyncEffect(async () => {
        if (!speciality.chairId) return;

        const chair = await ApiService.get(`/chairs/${speciality.chairId}`, { model: Chair });
        setChair(chair);
    }, [setChair]);

    return <div className="speciality">
        <Card>
            <Card.Header as="h5">{speciality.name}</Card.Header>

            <ListGroup variant="flush">
                <ListGroup.Item>
                    <b>Кафедра:</b> {chair ? chair.name : speciality.chairId || 'не вказано'}
                </ListGroup.Item>
            </ListGroup>

            {AuthService.isAuthenticated && <Card.Body>
                <ButtonGroup>
                    <Button variant="secondary" onClick={() => onEdit(speciality)}>
                        Відредагувати
                    </Button>

                    <Button variant="outline-danger" onClick={() => onDelete(speciality)}>
                        Видалити
                    </Button>
                </ButtonGroup>
            </Card.Body>}
        </Card>
    </div>;
};