import { ApiService } from "./ApiService";

export class AuthService {
    static async checkCredentials(login, password) {
        return await ApiService.get('/auth-check', {
            params: { login, password }
        });
    }

    static storeCredentials(login, password) {
        window.localStorage.setItem('auth:login', login);
        window.localStorage.setItem('auth:password', password);
    }

    static logout() {
        window.localStorage.removeItem('auth:login');
        window.localStorage.removeItem('auth:password');
    }

    static getCredentials() {
        const login = window.localStorage.getItem('auth:login');
        const password = window.localStorage.getItem('auth:password');

        return { login, password };
    }

    static get isAuthenticated() {
        return Boolean(this.getCredentials().login);
    }
}