import './GroupsPage.css';
import React from 'react';
import Select from 'react-select';
import useReactRouter from 'use-react-router';
import { useAsyncEffect } from 'use-async-effect';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { useQuery, buildQuery } from '../hooks/useQuery';
import { GroupList } from './list/GroupList';
import { Group } from '../../model/entities/Group';
import { ApiService } from '../../services/ApiService';
import { ConfirmDeleteDialog } from '../shared/ConfirmDeleteDialog';
import { AuthService } from '../../services/AuthService';
import { Grade } from '../../model/entities/Grade';

export const GroupsPage = () => {
    const { history, location } = useReactRouter();
    const [groups, setGroups] = React.useState([]);
    const [groupToDelete, setGroupToDelete] = React.useState(null);
    
    const [grades, setGrades] = React.useState([]);
    const gradeOptions = React.useMemo(() => (
        grades.map(grade => ({ label: grade.name, value: grade.id }))
    ), [grades]);

    const currentQuery = useQuery();

    const {
        values: query,
        createSelect,
    } = useForm({
        gradeId: {
            type: Number,
            value: currentQuery.gradeId,
            options: gradeOptions,
        },
    });

    useAsyncEffect(async () => {
        history.replace({
            path: location.pathname,
            search: buildQuery(query)
        });

        setGrades(await ApiService.get(`/grades`, { model: Grade }));
    }, [setGrades]);

    useAsyncEffect(async () => {
        setGroups(
            await ApiService.get(
                `/groups`,
                {
                    model: Group,
                    params: query
                }
            )
        );
    }, [setGroups, query]);

    function handleBack() {
        history.push('/');
    }

    function handleAdd() {
        history.push('/groups/add');
    }

    function handleOpenSchedule(group) {
        history.push(`/schedules/${group.scheduleId}`);
    }

    function handleEdit(group) {
        history.push(`/groups/${group.id}`);
    }

    async function handleDeleteGroup() {
        await ApiService.remove(`/groups/${groupToDelete.id}`);
        setGroups(groups.filter(e => e !== groupToDelete));
        setGroupToDelete(null);
    }

    return <>
        <ConfirmDeleteDialog
            show={groupToDelete !== null}
            onConfirm={handleDeleteGroup}
            onClose={() => setGroupToDelete(null)}
        />

        <div className="app__content groups-page">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
                {AuthService.isAuthenticated && <Button variant="primary" onClick={handleAdd}>Додати</Button>}
            </ButtonGroup>

            <div className="list-filters">
                <div className="list-filter__filter">
                    <Form.Group controlId="gradeId">
                        <Select
                            {...createSelect('gradeId', { placeholder: 'Усі навчальні потоки' })}
                            noOptionsMessage={() => 'Не знайдено'}
                        />
                    </Form.Group>
                </div>
            </div>

            <GroupList
                groups={groups}
                onOpenSchedule={handleOpenSchedule}
                onEdit={handleEdit}
                onDelete={s => setGroupToDelete(s)}
            />
        </div>
    </>;
};
