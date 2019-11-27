import React from 'react';
import { useAsyncEffect } from 'use-async-effect';
import { Card, Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Institute } from '../../../model/entities/Institute';
import { AuthService } from '../../../services/AuthService';

export const ChairListItem = ({ chair, onEdit, onDelete }) => {
    const [institute, setInstitute] = React.useState();

    useAsyncEffect(async () => {
        if (!chair.instituteId) return;

        const institute = await ApiService.get(`/institutes/${chair.instituteId}`, { model: Institute });
        setInstitute(institute);
    }, [setInstitute]);

    return <div className="chair">
        <Card>
            <Card.Header as="h5">{chair.name}</Card.Header>

            <ListGroup variant="flush">
                <ListGroup.Item>
                    <b>Інститут:</b> {institute ? institute.name : chair.instituteId || 'не вказано'}
                </ListGroup.Item>
            </ListGroup>

            {AuthService.isAuthenticated && <Card.Body>
                <ButtonGroup>
                    <Button variant="secondary" onClick={() => onEdit(chair)}>
                        Відредагувати
                    </Button>

                    <Button variant="outline-danger" onClick={() => onDelete(chair)}>
                        Видалити
                    </Button>
                </ButtonGroup>
            </Card.Body>}
        </Card>
    </div>;
};