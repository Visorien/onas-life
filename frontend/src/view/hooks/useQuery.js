import useReactRouter from 'use-react-router';
import { toCamelCase, toSnakeCase } from '../../utils/stringUtils';

export function useQuery() {
    const { location } = useReactRouter();
    return Object.fromEntries(
        [...new URLSearchParams(location.search).entries()]
            .map(([key, value]) => [toCamelCase(key), value])
    );
}

export function buildQuery(params) {
    const validParams = Object.fromEntries(
        Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null && value !== '')
            .map(([key, value]) => [toSnakeCase(key), value])
    );

    return '?' + new URLSearchParams(validParams).toString();
}
