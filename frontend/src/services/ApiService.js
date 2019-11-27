import axios from 'axios';
import { AuthService } from './AuthService';
import { toSnakeCase } from '../utils/stringUtils';

export class ApiService {
    static deserialize(data, Model) {
        if (!data || !Model)
            return data;
        if (Array.isArray(data)) {
            return data.map(item => new Model(item));
        }
        return new Model(data);
    }

    static async get(url, options = {}) {
        const response = await axios.get(
            this._buildUrl(url),
            {
                params: this._formatParams(options.params),
                headers: this.applyDefaultHeaders(options.headers)
            }
        );

        return this.deserialize(response.data, options.model);
    }

    static async post(url, options = {}) {
        const response = await axios.post(
            this._buildUrl(url), options.body,
            { headers: this.applyDefaultHeaders(options.headers) }
        );

        return this.deserialize(response.data, options.model);
    }

    static async remove(url, params = {}, options = {}) {
        await axios.delete(
            this._buildUrl(url),
            {
                params: this._formatParams(params),
                headers: this.applyDefaultHeaders(options.headers)
            }
        );
    }

    static applyDefaultHeaders(headers) {
        const result = { ...headers };

        if (AuthService.isAuthenticated) {
            const { login, password } = AuthService.getCredentials();
            result['Authorization'] = login + ':' + password;
        }

        return result;
    }

    static _formatParams(params) {
        if (!params || typeof params !== 'object') return params;

        return Object.fromEntries(
            Object.entries(params)
                .filter(([_, value]) => value !== undefined)
                .map(([key, value]) => [toSnakeCase(key), value])
        );
    }
    
    static _buildUrl(url) {
        return [process.env.REACT_APP_API_URL, url]
            .map(s => s.replace(/(^\/|\/$)/g, ''))
            .join('/');
    }
}
