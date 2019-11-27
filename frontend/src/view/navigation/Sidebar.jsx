import './Sidebar.css';

import React from 'react';
import useReactRouter from 'use-react-router';
import useMedia from 'use-media';
import { Button, ButtonGroup } from 'react-bootstrap';
import { AuthService } from '../../services/AuthService';

const navigation = {
    '/institutes': {
        name: 'Інститути',
        children: {
            '/chairs': { name: 'Кафедри' },
            '/specialities': { name: 'Спеціальності' },
            '/specializations': { name: 'Спеціалізації' }
        }
    },
    '/grades': {
        name: 'Навчальні потоки',
        children: {
            '/groups': { name: 'Групи' },
            '/schedules': { name: 'Розклади' },
            '/subjects': { name: 'Предмети' }
        }
    },
    '/employees': {
        name: 'Співробітники'
    }
};

export const Sidebar = () => {
    const { history } = useReactRouter();
    const isCompact = useMedia({ maxWidth: 820 });
    const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(false);

    React.useEffect(() => {
        const root = document.getElementById('root');

        if (isDarkModeEnabled) {
            root.classList.add('dark-mode');
        } else {
            root.classList.remove('dark-mode');
        }
    }, [isDarkModeEnabled]);

    function navigate(page) {
        if (history.location.pathname !== page) {
            history.push(page);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleLogout() {
        AuthService.logout();
        window.location.reload();
    }

    const navigationButtons = Object.entries(navigation).map(([parentPage, parentInfo]) => {
        const isSelected = history.location.pathname.startsWith(parentPage);
        const isChildSelected = Object.keys(parentInfo.children || {}).some(page => history.location.pathname.startsWith(page));

        return [
            <Button
                key={parentPage}
                className="sidebar__button" onClick={() => navigate(parentPage)} variant={
                (isSelected || (isChildSelected && isCompact)) ? 'primary' :
                isChildSelected ? 'dark' :
                'light'
            }>
                {parentInfo.name}
            </Button>,
            !isCompact && (isSelected || isChildSelected) && (
                Object.entries(parentInfo.children || {}).map(([childPage, childInfo]) => {
                    const isSelected = history.location.pathname.startsWith(childPage);

                    return <Button
                        key={childPage}
                        className="sidebar__button" onClick={() => navigate(childPage)} variant={isSelected ? 'primary' : 'secondary'}>
                        {childInfo.name}
                    </Button>;
                })
            )
        ];
    });

    return <div className="sidebar">
        <img
            className="sidebar__logo"
            src={'https://vitaly-rudenko.github.io/digital-resistance/images/logo.png'}
            alt="logo"
            onClick={() => navigate('/dashboard')}
        />

        <div className="sidebar__actions">
            <ButtonGroup vertical className="sidebar__button-group">
                {navigationButtons.flat()}
            </ButtonGroup>

            {!isCompact && (
                <Button className="sidebar__button" variant="light" onClick={() => setIsDarkModeEnabled(!isDarkModeEnabled)}>
                    {isDarkModeEnabled ? 'Увімкнути світло' : 'Вимкнути світло'}
                </Button>
            )}

            {AuthService.isAuthenticated && <Button
                className="sidebar__button"
                variant="light"
                onClick={handleLogout}>
                Вийти з акаунту
            </Button>}
        </div>
    </div>;
};
