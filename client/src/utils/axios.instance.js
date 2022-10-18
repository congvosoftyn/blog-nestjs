/**
 * https://dev.to/nilanth/how-to-use-axios-in-an-optimized-and-scalable-way-with-react-518n
 * https://youtu.be/0aPLk2e2Z3g
 * https://medium.com/nerd-for-tech/how-to-dockerize-a-nestjs-project-e80774d2459b
 */

import axios from 'axios';

const BASE_API = 'http://localhost:4001'

const AxiosInstance = axios.create({
    baseURL: BASE_API,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json"
    },
    timeout: 5000,
    withCredentials: true
});

AxiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        // refresh token
    }
    return Promise.reject(error);
})


export { AxiosInstance };