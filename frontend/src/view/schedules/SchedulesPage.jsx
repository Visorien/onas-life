import './SchedulesPage.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Button, ButtonGroup } from 'react-bootstrap';
import { ScheduleList } from './list/ScheduleList';
import { Schedule } from '../../model/entities/Schedule';
import { ApiService } from '../../services/ApiService';
import { ConfirmDeleteDialog } from '../shared/ConfirmDeleteDialog';
import { AuthService } from '../../services/AuthService';

export const SchedulesPage = () => {
    const { history } = useReactRouter();
    const [scheduleToDelete, setScheduleToDelete] = React.useState(null);
    const [schedules, setSchedules] = React.useState([]);

    useAsyncEffect(async () => {
        const schedules = await ApiService.get('/schedules', { model: Schedule });
        setSchedules(schedules);
    }, [setSchedules]);

    function handleBack() {
        history.push('/');
    }

    function handleAdd() {
        history.push('/schedules/add');
    }

    function handleEdit(schedule) {
        history.push(`/schedules/${schedule.id}/edit`);
    }

    function handleOpen(schedule) {
        history.push(`/schedules/${schedule.id}`);
    }

    async function handleScheduleDelete() {
        await ApiService.remove(`/schedules/${scheduleToDelete.id}`);
        setSchedules(schedules.filter(e => e !== scheduleToDelete));
        setScheduleToDelete(null);
    }

    return <>
        <ConfirmDeleteDialog
            show={scheduleToDelete !== null}
            onClose={() => setScheduleToDelete(null)}
            onConfirm={handleScheduleDelete}
        />

        
        <div className="app__content schedules-page">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
                {AuthService.isAuthenticated && <Button variant="primary" onClick={handleAdd}>Додати</Button>}
            </ButtonGroup>

            {schedules && <ScheduleList
                schedules={schedules}
                onOpen={handleOpen}
                onEdit={handleEdit}
                onDelete={s => setScheduleToDelete(s)}
            />}
        </div>
    </>;
};
