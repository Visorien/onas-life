import './ActivityForm.css';

import React from 'react';
import Select from 'react-select';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { Week } from '../../../model/enums/Week';
import { ActivityType } from '../../../model/enums/ActivityType';

export const ACTIVITY_TYPE_TRANSLATIONS = {
    [ActivityType.ASRS]: 'АСРС',
    [ActivityType.LAB]: 'Лабораторна робота',
    [ActivityType.LECTURE]: 'Лекція',
    [ActivityType.PRACTICE_LAB]: 'Практика, лаб. робота',
    [ActivityType.PRACTICE]: 'Практика',
};

export const WEEK_TRANSLATIONS = {
    [Week.EVERY]: 'Кожен тиждень',
    [Week.ODD]: 'Непарні тижні',
    [Week.EVEN]: 'Парні тижні',
    [Week.CUSTOM]: 'Вказані тижні',
};

export const ActivityForm = ({
    availableWeekOptions,
    day, index, subjects, employees, onSubmit
}) => {
    const [fold, setFold] = React.useState(true);

    const employeeOptions = React.useMemo(() => (
        employees.map(employee => ({ label: employee.fullName, value: employee.id }))
    ), [employees]);

    const subjectOptions = React.useMemo(() => (
        subjects.map(subject => ({ label: subject.name, value: subject.id }))
    ), [subjects]);

    const handleActivitySubmit = React.useCallback((values) => {
        setFold(true);
        onSubmit({
            day, index,
            type: values.type,
            week: values.week,
            weeks: values.week === Week.CUSTOM ? values.weeks.split(/ ?, ?/).map(Number) : undefined,
            place: values.place,
            subjectId: values.subjectId,
            teacherEmployeeId: values.teacherEmployeeId,
        });
    }, [day, index, onSubmit]);

    const {
        validated, values, setValue,
        createInput, createSelect, handleFormSubmit
    } = useForm({
        type: { type: String, value: ActivityType.LECTURE, },
        place: { type: String },
        subjectId: { type: Number, options: subjectOptions },
        teacherEmployeeId: { type: Number, options: employeeOptions },
        week: { type: String, value: availableWeekOptions.includes(Week.EVERY) ? Week.EVERY : availableWeekOptions[0] },
        weeks: { type: String }
    }, handleActivitySubmit);

    React.useEffect(() => {
        if (subjects && subjects.length > 0 && !values.subjectId) {
            setValue('subjectId', subjects[0].id);
        }
    }, [values.subjectId, subjects, setValue]);

    const defaultEmployee = React.useMemo(() => {
        const subject = values.subjectId && subjects && subjects.find(s => s.id === values.subjectId);
        if (!subject || !subject.teacherEmployeeId) return null;

        return employees.find(e => e.id === subject.teacherEmployeeId);
    }, [values.subjectId, subjects, employees]);

    const handleFold = React.useCallback(() => {
        setFold(true);
    }, [setFold]);

    const handleUnfold = React.useCallback(() => {
        setFold(false);
    }, [setFold]);

    if (fold) {
        return <div className="schedule__activity__form">
            <Button
                className="schedule__activity__form__unfold-button"
                variant="secondary"
                type="submit"
                onClick={handleUnfold}>
                Додати
            </Button>
        </div>
    }

    return <div className="schedule__activity__form">
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Form.Group controlId="subjectId">
                <Select
                    {...createSelect('subjectId', { placeholder: 'Предмет', required: true })}
                    noOptionsMessage={() => 'Не знайдено'}
                />
            </Form.Group>

            <Form.Group controlId="teacherEmployeeId">
                <Select
                    {...createSelect('teacherEmployeeId', {
                        placeholder: 'Викладач',
                        defaultOption: defaultEmployee && {
                            label: `[${defaultEmployee.fullName}]`
                        }
                    })}
                    noOptionsMessage={() => 'Не знайдено'}
                />
            </Form.Group>

            <Form.Group controlId="type">
                <Form.Control as="select" {...createInput('type')} required>
                    {Object.values(ActivityType).map(type => (
                        <option
                            key={type}
                            value={type}>{ACTIVITY_TYPE_TRANSLATIONS[type]}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="place">
                <Form.Control
                    {...createInput('place')}
                    type="text"
                    placeholder="Аудиторія"
                    required
                />
            </Form.Group>

            <Form.Group controlId="week">
                <Form.Control as="select" {...createInput('week')} required>
                    {(availableWeekOptions || Object.values(Week)).map(week => (
                        <option
                            key={week}
                            value={week}>{WEEK_TRANSLATIONS[week]}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            {values.week === Week.CUSTOM && <Form.Group controlId="weeks">
                <Form.Control
                    {...createInput('weeks')}
                    type="text"
                    placeholder="Тижні (через кому)"
                    pattern="^\d+( ?, ?\d+)*$"
                    required
                />
            </Form.Group>}

            <ButtonGroup>
                <Button variant="primary" type="submit">
                    Зберегти
                </Button>

                <Button variant="outline-primary" type="button" onClick={handleFold}>
                    Скасувати
                </Button>
            </ButtonGroup>
        </Form>
    </div>;
};