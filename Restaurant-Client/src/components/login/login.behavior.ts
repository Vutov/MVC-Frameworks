import { get, post } from '../../services/requester';
import observer from '../../services/observer'

export class LoginBehavior {

    public login(username: string, password: string, callback: Function) {
        let userData = {
            Username: username,
            Password: password,
            grant_type: "password"
        };

        post('account', 'login', userData)
            .then(function loginSuccess(userInfo) {
                observer.saveSession(userInfo);
                get('roles', 'my', 'basic')
                    .then(function (data) {
                        observer.saveRole(data[0].name);
                    })

                observer.showSuccess('Login successful.');
                callback(true);
            });
    }

    public logout(callback: Function) {
        observer.showSuccess('Logout successful.');
        sessionStorage.clear();
        observer.onSessionUpdate();
        callback(true);
    }
}
