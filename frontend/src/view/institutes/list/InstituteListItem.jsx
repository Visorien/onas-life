import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { AuthService } from '../../../services/AuthService';

export const InstituteListItem = ({ institute, onEdit, onDelete }) => {
    return <div className="institute">
        <Card>
            <Card.Header as="h5">{institute.name}</Card.Header>

            {AuthService.isAuthenticated && <Card.Body>
                <ButtonGroup>
                    <Button variant="secondary" onClick={() => onEdit(institute)}>
                        Відредагувати
                    </Button>

                    <Button variant="outline-danger" onClick={() => onDelete(institute)}>
                        Видалити
                    </Button>
                </ButtonGroup>
            </Card.Body>}
        </Card>
    </div>;
};