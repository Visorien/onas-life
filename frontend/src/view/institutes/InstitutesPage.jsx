import './InstitutesPage.css';
import React from 'react';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Button, ButtonGroup } from 'react-bootstrap';
import { InstituteList } from './list/InstituteList';
import { Institute } from '../../model/entities/Institute';
import { ApiService } from '../../services/ApiService';
import { ConfirmDeleteDialog } from '../shared/ConfirmDeleteDialog';
import { AuthService } from '../../services/AuthService';

export const InstitutesPage = () => {
    const { history } = useReactRouter();
    const [institutes, setInstitutes] = React.useState([]);
    const [instituteToDelete, setInstituteToDelete] = React.useState(null);
    
    useAsyncEffect(async () => {
        const institutes = await ApiService.get('/institutes', { model: Institute });
        setInstitutes(institutes);
    }, [setInstitutes]);

    function handleBack() {
        history.push('/');
    }

    function handleAdd() {
        history.push('/institutes/add');
    }

    function handleEdit(institute) {
        history.push(`/institutes/${institute.id}`);
    }

    async function handleDeleteInstitute() {
        await ApiService.remove(`/institutes/${instituteToDelete.id}`);
        setInstitutes(institutes.filter(e => e !== instituteToDelete));
        setInstituteToDelete(null);
    }

    return <>
        <ConfirmDeleteDialog
            show={instituteToDelete !== null}
            onConfirm={handleDeleteInstitute}
            onClose={() => setInstituteToDelete(null)}
        />

        <div className="app__content institutes-page">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
                {AuthService.isAuthenticated && <Button variant="primary" onClick={handleAdd}>Додати</Button>}
            </ButtonGroup>

            <InstituteList
                institutes={institutes}
                onEdit={handleEdit}
                onDelete={s => setInstituteToDelete(s)}
            />
        </div>
    </>;
};
