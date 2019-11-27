import './ChairsPage.css';
import React from 'react';
import useReactRouter from 'use-react-router';
import Select from 'react-select';
import { useAsyncEffect } from 'use-async-effect';
import { Form } from 'react-bootstrap';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { Institute } from '../../model/entities/Institute';
import { ChairList } from './list/ChairList';
import { Chair } from '../../model/entities/Chair';
import { ApiService } from '../../services/ApiService';
import { ConfirmDeleteDialog } from '../shared/ConfirmDeleteDialog';
import { AuthService } from '../../services/AuthService';
import { useQuery, buildQuery } from '../hooks/useQuery';

export const ChairsPage = () => {
    const { history, location } = useReactRouter();
    const [chairs, setChairs] = React.useState([]);
    const [chairToDelete, setChairToDelete] = React.useState(null);

    const [institutes, setInstitutes] = React.useState([]);
    const instituteOptions = React.useMemo(() => (
        institutes.map(institute => ({ label: institute.name, value: institute.id }))
    ), [institutes]);

    const currentQuery = useQuery();

    const {
        values: query,
        createSelect,
    } = useForm({
        instituteId: {
            type: Number,
            value: currentQuery.instituteId,
            options: instituteOptions,
        },
    });

    useAsyncEffect(async () => {
        history.replace({
            path: location.pathname,
            search: buildQuery(query)
        });

        setInstitutes(await ApiService.get(`/institutes`, { model: Institute }));
    }, [setInstitutes]);

    useAsyncEffect(async () => {
        setChairs(
            await ApiService.get(
                `/chairs`,
                {
                    model: Chair,
                    params: query
                }
            )
        );
    }, [setChairs, query]);

    function handleBack() {
        history.push('/');
    }

    function handleAdd() {
        history.push('/chairs/add');
    }

    function handleEdit(chair) {
        history.push(`/chairs/${chair.id}`);
    }

    async function handleDeleteChair() {
        await ApiService.remove(`/chairs/${chairToDelete.id}`);
        setChairs(chairs.filter(e => e !== chairToDelete));
        setChairToDelete(null);
    }

    return <>
        <ConfirmDeleteDialog
            show={chairToDelete !== null}
            onConfirm={handleDeleteChair}
            onClose={() => setChairToDelete(null)}
        />

        <div className="app__content chairs-page">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
                {AuthService.isAuthenticated && <Button variant="primary" onClick={handleAdd}>Додати</Button>}
            </ButtonGroup>

            <div className="list-filters">
                <div className="list-filter__filter">
                    <Form.Group controlId="instituteId">
                        <Select
                            {...createSelect('instituteId', { placeholder: 'Усі інститути' })}
                            noOptionsMessage={() => 'Не знайдено'}
                        />
                    </Form.Group>
                </div>
            </div>

            <ChairList
                chairs={chairs}
                onEdit={handleEdit}
                onDelete={s => setChairToDelete(s)}
            />
        </div>
    </>;
};
