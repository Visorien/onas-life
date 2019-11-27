import './GradesPage.css';
import React from 'react';
import useReactRouter from 'use-react-router';
import Select from 'react-select';
import { Form } from 'react-bootstrap';
import { useAsyncEffect } from 'use-async-effect';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { useQuery, buildQuery } from '../hooks/useQuery';
import { GradeList } from './list/GradeList';
import { Grade } from '../../model/entities/Grade';
import { ApiService } from '../../services/ApiService';
import { ConfirmDeleteDialog } from '../shared/ConfirmDeleteDialog';
import { AuthService } from '../../services/AuthService';
import { Specialization } from '../../model/entities/Specialization';

export const GradesPage = () => {
    const { history, location } = useReactRouter();
    const [grades, setGrades] = React.useState([]);
    const [gradeToDelete, setGradeToDelete] = React.useState(null);
    
    const [specializations, setSpecializations] = React.useState([]);
    const specializationOptions = React.useMemo(() => (
        specializations.map(specialization => ({ label: specialization.name, value: specialization.id }))
    ), [specializations]);

    const currentQuery = useQuery();

    const {
        values: query,
        createSelect,
    } = useForm({
        specializationId: {
            type: Number,
            value: currentQuery.specializationId,
            options: specializationOptions,
        },
    });

    useAsyncEffect(async () => {
        history.replace({
            path: location.pathname,
            search: buildQuery(query)
        });

        setSpecializations(await ApiService.get(`/specializations`, { model: Specialization }));
    }, [setSpecializations]);

    useAsyncEffect(async () => {
        setGrades(
            await ApiService.get(
                `/grades`,
                {
                    model: Grade,
                    params: query
                }
            )
        );
    }, [setGrades, query]);

    function handleBack() {
        history.push('/');
    }

    function handleAdd() {
        history.push('/grades/add');
    }

    function handleEdit(grade) {
        history.push(`/grades/${grade.id}`);
    }

    async function handleDeleteGrade() {
        await ApiService.remove(`/grades/${gradeToDelete.id}`);
        setGrades(grades.filter(e => e !== gradeToDelete));
        setGradeToDelete(null);
    }

    return <>
        <ConfirmDeleteDialog
            show={gradeToDelete !== null}
            onConfirm={handleDeleteGrade}
            onClose={() => setGradeToDelete(null)}
        />

        <div className="app__content grades-page">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
                {AuthService.isAuthenticated && <Button variant="primary" onClick={handleAdd}>Додати</Button>}
            </ButtonGroup>

            <div className="list-filters">
                <div className="list-filter__filter">
                    <Form.Group controlId="specializationId">
                        <Select
                            {...createSelect('specializationId', { placeholder: 'Усі спеціалізації' })}
                            noOptionsMessage={() => 'Не знайдено'}
                        />
                    </Form.Group>
                </div>
            </div>

            <GradeList
                grades={grades}
                onEdit={handleEdit}
                onDelete={s => setGradeToDelete(s)}
            />
        </div>
    </>;
};
