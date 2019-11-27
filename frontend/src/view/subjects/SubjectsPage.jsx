import './SubjectsPage.css';
import React from 'react';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Button, ButtonGroup } from 'react-bootstrap';
import { SubjectList } from './list/SubjectList';
import { Subject } from '../../model/entities/Subject';
import { ApiService } from '../../services/ApiService';
import { ConfirmDeleteDialog } from '../shared/ConfirmDeleteDialog';
import { AuthService } from '../../services/AuthService';

export const SubjectsPage = () => {
    const { history } = useReactRouter();
    const [subjects, setSubjects] = React.useState([]);
    const [subjectToDelete, setSubjectToDelete] = React.useState(null);
    
    useAsyncEffect(async () => {
        const subjects = await ApiService.get('/subjects', { model: Subject });
        setSubjects(subjects);
    }, [setSubjects]);

    function handleBack() {
        history.push('/');
    }

    function handleAdd() {
        history.push('/subjects/add');
    }

    function handleEdit(subject) {
        history.push(`/subjects/${subject.id}`);
    }

    async function handleDeleteSubject() {
        await ApiService.remove(`/subjects/${subjectToDelete.id}`);
        setSubjects(subjects.filter(e => e !== subjectToDelete));
        setSubjectToDelete(null);
    }

    return <>
        <ConfirmDeleteDialog
            show={subjectToDelete !== null}
            onConfirm={handleDeleteSubject}
            onClose={() => setSubjectToDelete(null)}
        />

        <div className="app__content subjects-page">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
                {AuthService.isAuthenticated && <Button variant="primary" onClick={handleAdd}>Додати</Button>}
            </ButtonGroup>

            <SubjectList
                subjects={subjects}
                onEdit={handleEdit}
                onDelete={s => setSubjectToDelete(s)}
            />
        </div>
    </>;
};
