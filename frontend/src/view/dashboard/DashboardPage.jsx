import './DashboardPage.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import { Form } from 'react-bootstrap';
import { GroupList } from '../groups/list/GroupList';
import { ApiService } from '../../services/ApiService';
import { Group } from '../../model/entities/Group';
import { ConfirmDeleteDialog } from '../shared/ConfirmDeleteDialog';

export const DashboardPage = () => {
    const { history } = useReactRouter();

    const debounce = React.useRef({ timeoutId: null });

    const [groupToDelete, setGroupToDelete] = React.useState(null);
    const [query, setQuery] = React.useState('');
    const [groups, setGroups] = React.useState([]);

    React.useEffect(() => {
        if (debounce.current.timeoutId) {
            clearTimeout(debounce.current.timeoutId);
        }

        debounce.current.timeoutId = setTimeout(async () => {
            debounce.current.timeoutId = null;
            setGroups(
                await ApiService.get(
                    '/groups',
                    {
                        params: { name: query },
                        model: Group
                    }
                )
            );
        }, 1000);
    }, [debounce, query, setGroups]);

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

    function handleQueryChange(event) {
        setQuery(event.currentTarget.value);
    }

    return <>
        <div className="dashboard-page-background"></div>

        <ConfirmDeleteDialog
            show={groupToDelete !== null}
            onConfirm={handleDeleteGroup}
            onClose={() => setGroupToDelete(null)}
        />

        <div className="dashboard-page app__content">
                <Form.Group controlId="query">
                    <Form.Control
                        value={query}
                        onChange={handleQueryChange}
                        type="text"
                        placeholder="Пошук групи"
                        required
                    />
                </Form.Group>

            {groups.length > 0 && <GroupList
                groups={groups}
                onOpenSchedule={handleOpenSchedule}
                onEdit={handleEdit}
                onDelete={s => setGroupToDelete(s)}
            />}
        </div>
    </>;
};
