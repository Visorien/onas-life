import React from 'react';
import useReactRouter from 'use-react-router';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { AuthService } from '../../services/AuthService';
import { useForm } from '../hooks/useForm';
import './LoginPage.css';

export const LoginPage = () => {
    const { history } = useReactRouter();

    function handleBack() {
        history.push('/');
    }

    async function handleSubmit() {
        const isValid = await AuthService.checkCredentials(
            values.login, values.password
        );

        if (!isValid) {
            // TODO: notify about wrong credentials
            setValues({
                login: values.login,
                password: null,
            });
            return;
        }
        
        AuthService.storeCredentials(values.login, values.password);
        history.push('/');
    }

    const {
        validated,
        values, setValues,
        createInput, handleFormSubmit
    } = useForm({
        login: { type: String },
        password: { type: String },
    }, handleSubmit);

    return <>
        <div className="login-page app__content">
            <ButtonGroup>
                <Button variant="light" onClick={handleBack}>Назад</Button>
            </ButtonGroup>

            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group controlId="login">
                    <Form.Control
                        {...createInput('login')}
                        type="text"
                        placeholder="Логін"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Control
                        {...createInput('password')}
                        type="text"
                        placeholder="Пароль"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Увійти
                </Button>
            </Form>
        </div>
    </>;
};
