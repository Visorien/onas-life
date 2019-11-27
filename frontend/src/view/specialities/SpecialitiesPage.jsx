import './SpecialitiesPage.css';
import React from 'react';
import Select from 'react-select';
import useReactRouter from 'use-react-router';
import { Form } from 'react-bootstrap';
import { useAsyncEffect } from 'use-async-effect';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { SpecialityList } from './list/SpecialityList';
import { Speciality } from '../../model/entities/Speciality';
import { ApiService } from '../../services/ApiService';
import { ConfirmDeleteDialog } from '../shared/ConfirmDeleteDialog';
import { AuthService } from '../../services/AuthService';
import { useQuery, buildQuery } from '../hooks/useQuery';
import { Chair } from '../../model/entities/Chair';

export const SpecialitiesPage = () => {
    const { history, location } = useReactRouter();
    const [specialities, setSpecialities] = React.useState([]);
    const [specialityToDelete, setSpecialityToDelete] = React.useState(null);
    
    const [chairs, setChairs] = React.useState([]);
    const chairOptions = React.useMemo(() => (
        chairs.map(chair => ({ label: chair.name, value: chair.id }))
    ), [chairs]);

    const currentQuery = useQuery();

    const {
        values: query,
        createSelect,
    } = useForm({
        chairId: {
            type: Number,
            value: currentQuery.chairId,
            options: chairOptions,
        },
    });

    useAsyncEffect(async () => {
        history.replace({
            path: location.pathname,
            search: buildQuery(query)
        });

        setChairs(await ApiService.get(`/chairs`, { model: Chair }));
    }, [setChairs]);

    useAsyncEffect(async () => {
        setSpecialities(
            await ApiService.get(
                `/specialities`,
                {
                    model: Speciality,
                    params: query
                }
            )
        );
    }, [setSpecialities, query]);

    function handleBack() {
        history.push('/');
    }

    function handleAdd() {
        history.push('/specialities/add');
    }

    function handleEdit(speciality) {
        history.push(`/specialities/${speciality.id}`);
    }

    async function handleDeleteSpeciality() {
        await ApiService.remove(`/specialities/${specialityToDelete.id}`);
        setSpecialities(specialities.filter(e => e !== specialityToDelete));
        setSpecialityToDelete(null);
    }

    return <>
        <ConfirmDeleteDialog
            show={specialityToDelete !== null}
            onConfirm={handleDeleteSpeciality}
            onClose={() => setSpecialityToDelete(null)}
        />

        <div className="app__content specialities-page">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
                {AuthService.isAuthenticated && <Button variant="primary" onClick={handleAdd}>Додати</Button>}
            </ButtonGroup>

            <div className="list-filters">
                <div className="list-filter__filter">
                    <Form.Group controlId="chairId">
                        <Select
                            {...createSelect('chairId', { placeholder: 'Усі кафедри' })}
                            noOptionsMessage={() => 'Не знайдено'}
                        />
                    </Form.Group>
                </div>
            </div>

            <SpecialityList
                specialities={specialities}
                onEdit={handleEdit}
                onDelete={s => setSpecialityToDelete(s)}
            />
        </div>
    </>;
};
