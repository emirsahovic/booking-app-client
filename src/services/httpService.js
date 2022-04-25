import axios from 'axios';

const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};

let apiService = axios.create(defaultOptions);

apiService.interceptors.request.use(function (config) {
    const userFromStorage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    const token = userFromStorage && userFromStorage.token;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})

export default apiService;
