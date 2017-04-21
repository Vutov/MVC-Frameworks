import { post, get, update } from './requester';
import observer from './observer';

function saveSession(userInfo) {
    console.log(userInfo);
    let userAuth = userInfo.access_token;
    sessionStorage.setItem('authToken', userAuth);
    let username = userInfo.userName;
    sessionStorage.setItem('username', username);

    observer.onSessionUpdate();
}

// user/login
function login(username, password, callback) {
    let userData = {
        username,
        password,
        grant_type: "password"
    };

    post('account', 'login', userData)
        .then(loginSuccess);

    function loginSuccess(userInfo) {
        saveSession(userInfo);
        observer.showSuccess('Login successful.');
        callback(true);
    }
}

// user/register
function register(username, password, name, callback) {
    let userData = {
        name,
        username,
        password
    };

    post('user', '', userData, 'basic')
        .then(registerSuccess);

    function registerSuccess(userInfo) {
        observer.showSuccess('User registration successful.');
        saveSession(userInfo);
        callback(true);
    }
}

// user/logout
function logout(callback) {
    observer.showSuccess('Logout successful.');
    sessionStorage.clear();
    observer.onSessionUpdate();
    callback(true);
}

export { login, register, logout };