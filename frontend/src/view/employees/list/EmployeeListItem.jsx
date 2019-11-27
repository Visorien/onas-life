import React from 'react';
import { Card, Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { AuthService } from '../../../services/AuthService';

export const EmployeeListItem = ({ employee, onEdit, onDelete }) => {
    return <div className="employee">
        <Card>
            <Card.Header as="h5">
                {employee.fullName}
            </Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <b>Телефон:</b> {employee.phoneNumber || 'не вказано'}
                </ListGroup.Item>
                <ListGroup.Item>
                    <b>E-mail:</b> {employee.email || 'не вказано'}
                </ListGroup.Item>
            </ListGroup>

            {AuthService.isAuthenticated && <Card.Body>
                <ButtonGroup>
                    <Button variant="secondary" onClick={() => onEdit(employee)}>
                        Відредагувати
                    </Button>

                    <Button variant="outline-danger" onClick={() => onDelete(employee)}>
                        Видалити
                    </Button>
                </ButtonGroup>
            </Card.Body>}
        </Card>
    </div>;
};
