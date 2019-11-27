import React from 'react';

function valueToForm(value, type) {
    if (value === null || value === undefined)
        return type === Boolean ? false : '';
    return value;
}

function formToValue(value, type) {
    if (value === '' || value === null || value === undefined)
        return null;
    if (type === Boolean)
        return Boolean(type);
    if (type === Number)
        return !Number.isNaN(Number(value)) ? Number(value) : undefined;
    if (type === String)
        return String(value);
    return value;
}

export function useForm(fields, onSubmit) {
    const [validated, setValidated] = React.useState(false);

    const [values, setValues] = React.useState(Object.fromEntries(Object.entries(fields)
        .map(([name, field]) => [name, formToValue(field.value, field.type)])));

    const setValue = React.useCallback((name, value) => {
        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    }, [setValues]);

    const handleInputChange = React.useCallback((event) => {
        const name = event.currentTarget.name;
        const formValue = event.currentTarget.value;
        const value = formToValue(formValue, fields[name].type);
        
        setValue(name, value);
    }, [fields, setValue]);

    const handleSelectChange = React.useCallback((name, selectedOption) => {
        const value = formToValue(selectedOption.value, fields[name].type);
        setValue(name, value);
    }, [fields, setValue]);

    const handleCheckboxChange = React.useCallback((event) => {
        const name = event.currentTarget.name;
        const newValue = !values[name];
        
        setValue(name, newValue);
    }, [values, setValue]);

    const createInput = React.useCallback((name) => ({
        name,
        value: valueToForm(values[name], fields[name].type),
        onChange: (event) => handleInputChange(event)
    }), [fields, values, handleInputChange]);

    const createSelect = React.useCallback((name, { placeholder, required, defaultOption } = {}) => {
        const options = [
            !required && placeholder && { label: placeholder, value: '', ...defaultOption },
            ...fields[name].options
        ].filter(Boolean);

        const selectedOption = fields[name].options.find(o => o.value === values[name]);

        return {
            name,
            placeholder,
            value: selectedOption || options[0],
            options,
            onChange: (selectedOption) => handleSelectChange(name, selectedOption)
        };
    }, [fields, values, handleSelectChange]);

    const createCheckbox = React.useCallback((name) => ({
        name,
        checked: valueToForm(values[name], fields[name].type),
        onChange: (event) => handleCheckboxChange(event)
    }), [fields, values, handleCheckboxChange]);

    const handleFormSubmit = React.useCallback(async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity()) {
            onSubmit(values);
            return;
        }

        setValidated(true);
    }, [setValidated, onSubmit, values]);

    return {
        validated,
        values, setValue, setValues,
        createInput, createSelect, createCheckbox,
        handleFormSubmit,
    };
}
