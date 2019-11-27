import React from 'react';
import { useAsyncEffect } from 'use-async-effect';
import { Card, Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Employee } from '../../../model/entities/Employee';
import { AuthService } from '../../../services/AuthService';

export const SubjectListItem = ({ subject, onEdit, onDelete }) => {
    const [employee, setEmployee] = React.useState();

    useAsyncEffect(async () => {
        if (!subject.teacherEmployeeId) return;

        const employee = await ApiService.get(`/employees/${subject.teacherEmployeeId}`, { model: Employee });
        setEmployee(employee);
    }, [setEmployee]);

    return <div className="subject">
        <Card>
            <Card.Header as="h5">{subject.name}</Card.Header>

            <ListGroup variant="flush">
                <ListGroup.Item>
                    <b>Викладач:</b> {employee ? employee.fullName : subject.teacherEmployeeId || 'не вказано'}
                </ListGroup.Item>
            </ListGroup>

            {AuthService.isAuthenticated && <Card.Body>
                <ButtonGroup>
                    <Button variant="secondary" onClick={() => onEdit(subject)}>
                        Відредагувати
                    </Button>

                    <Button variant="outline-danger" onClick={() => onDelete(subject)}>
                        Видалити
                    </Button>
                </ButtonGroup>
            </Card.Body>}
        </Card>
    </div>;
};