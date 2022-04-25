import apiService from './httpService';

const registerUser = async (userData) => {
    await apiService.post('/register', userData);
}

const loginUser = async (userData) => {
    const { data } = await apiService.post('/login', userData);

    if (data) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
}

const logout = async () => {
    localStorage.removeItem('user');
}

const authService = {
    registerUser,
    loginUser,
    logout
}

export default authService;
