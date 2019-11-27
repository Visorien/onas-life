import './SpecializationsPage.css';
import React from 'react';
import Select from 'react-select';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Form } from 'react-bootstrap';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useQuery, buildQuery } from '../hooks/useQuery';
import { SpecializationList } from './list/SpecializationList';
import { Specialization } from '../../model/entities/Specialization';
import { ApiService } from '../../services/ApiService';
import { ConfirmDeleteDialog } from '../shared/ConfirmDeleteDialog';
import { AuthService } from '../../services/AuthService';
import { useForm } from '../hooks/useForm';
import { Speciality } from '../../model/entities/Speciality';

export const SpecializationsPage = () => {
    const { history, location } = useReactRouter();
    const [specializations, setSpecializations] = React.useState([]);
    const [specializationToDelete, setSpecializationToDelete] = React.useState(null);
    
    const [specialities, setSpecialities] = React.useState([]);
    const specialityOptions = React.useMemo(() => (
        specialities.map(speciality => ({ label: speciality.name, value: speciality.id }))
    ), [specialities]);

    const currentQuery = useQuery();

    const {
        values: query,
        createSelect,
    } = useForm({
        specialityId: {
            type: Number,
            value: currentQuery.specialityId,
            options: specialityOptions,
        },
    });

    useAsyncEffect(async () => {
        history.replace({
            path: location.pathname,
            search: buildQuery(query),
        });

        setSpecialities(await ApiService.get(`/specialities`, { model: Speciality }));
    }, [setSpecialities]);

    useAsyncEffect(async () => {
        setSpecializations(
            await ApiService.get(
                `/specializations`,
                {
                    model: Specialization,
                    params: query
                }
            )
        );
    }, [setSpecializations, query]);

    function handleBack() {
        history.push('/');
    }

    function handleAdd() {
        history.push('/specializations/add');
    }

    function handleEdit(specialization) {
        history.push(`/specializations/${specialization.id}`);
    }

    async function handleDeleteSpecialization() {
        await ApiService.remove(`/specializations/${specializationToDelete.id}`);
        setSpecializations(specializations.filter(e => e !== specializationToDelete));
        setSpecializationToDelete(null);
    }

    return <>
        <ConfirmDeleteDialog
            show={specializationToDelete !== null}
            onConfirm={handleDeleteSpecialization}
            onClose={() => setSpecializationToDelete(null)}
        />

        <div className="app__content specializations-page">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
                {AuthService.isAuthenticated && <Button variant="primary" onClick={handleAdd}>Додати</Button>}
            </ButtonGroup>

            <div className="list-filters">
                <div className="list-filter__filter">
                    <Form.Group controlId="specialityId">
                        <Select
                            {...createSelect('specialityId', { placeholder: 'Усі спеціальності' })}
                            noOptionsMessage={() => 'Не знайдено'}
                        />
                    </Form.Group>
                </div>
            </div>

            <SpecializationList
                specializations={specializations}
                onEdit={handleEdit}
                onDelete={s => setSpecializationToDelete(s)}
            />
        </div>
    </>;
};
