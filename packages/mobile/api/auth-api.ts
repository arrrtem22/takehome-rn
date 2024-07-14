import axios from 'axios';
import CONFIG from './config';

function login(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        axios.post(`${CONFIG.baseUrl}auth/login`, {
            username: username,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            resolve(response.data.data.token);
        }).catch((err) => {
            reject(err)
        });
    });
}

function register(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        axios.post(`${CONFIG.baseUrl}auth/register`, {
            username: username,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            resolve(response.data.data.token);
        }).catch((err) => {
            reject(err)
        });
    });
}

export const userService = {
    login,
    register,
};

