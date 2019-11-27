import React from 'react';
import { useAsyncEffect } from 'use-async-effect';
import { Card, Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { ApiService } from '../../../services/ApiService';
import { Grade } from '../../../model/entities/Grade';
import { AuthService } from '../../../services/AuthService';

export const GroupListItem = ({ group, onOpenSchedule, onEdit, onDelete }) => {
    const [grade, setGrade] = React.useState();

    useAsyncEffect(async () => {
        if (!group.gradeId) return;

        const grade = await ApiService.get(`/grades/${group.gradeId}`, { model: Grade });
        setGrade(grade);
    }, [setGrade]);

    return <div className="group">
        <Card>
            <Card.Header as="h5">{group.name}</Card.Header>

            <ListGroup variant="flush">
                <ListGroup.Item>
                    <b>Навчальний потік:</b> {grade ? grade.name : group.gradeId || 'не вказано'}
                </ListGroup.Item>
            </ListGroup>

            {(group.scheduleId || AuthService.isAuthenticated) && <Card.Body>
                <ButtonGroup>
                    {group.scheduleId && <Button variany="primary" onClick={() => onOpenSchedule(group)}>
                        Переглянути розклад
                    </Button>}

                    {AuthService.isAuthenticated && <>
                        <Button variant="secondary" onClick={() => onEdit(group)}>
                            Відредагувати
                        </Button>

                        <Button variant="outline-danger" onClick={() => onDelete(group)}>
                            Видалити
                        </Button>
                    </>}
                </ButtonGroup>
            </Card.Body>}
        </Card>
    </div>;
};