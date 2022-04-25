export const setRememberUser = (username, password) => {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
}

export const getRememberUser = () => {
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    return { username, password };
}

export const removeRememberUser = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
}