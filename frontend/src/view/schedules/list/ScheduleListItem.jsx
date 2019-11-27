import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { AuthService } from '../../../services/AuthService';

export const ScheduleListItem = ({ schedule, onOpen, onEdit, onDelete }) => {
    return <div className="schedule">
        <Card>
            <Card.Header as="h5">{schedule.name}</Card.Header>
            <Card.Body>
                <ButtonGroup>
                    <Button variant="primary" onClick={() => onOpen(schedule)}>Переглянути</Button>
                    {AuthService.isAuthenticated && <>
                        <Button variant="secondary" onClick={() => onEdit(schedule)}>Відредагувати</Button>
                        <Button variant="outline-danger" onClick={() => onDelete(schedule)}>Видалити</Button>
                    </>}
                </ButtonGroup>
            </Card.Body>
        </Card>
    </div>;
};