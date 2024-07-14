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

// async function logout(getState) {
//     return new Promise((resolve, reject) => {
//         const currentState = getState();
//         const { token } = currentState.auth;
//         axios.get(`${API_URL}/logout`, {
//             headers: {
//                 authorization: `Bearer ${token}`,
//             },
//         }).then(async (response) => {
//             resolve(response);
//             await resetAuthAsyncStorage();
//         }).catch((err) => reject(err));
//     });
// }

export const userService = {
    login,
    // logout,
};

