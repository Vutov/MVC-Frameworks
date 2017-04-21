import { post } from '../../services/requester';
import observer from '../../services/observer'

export class RegisterBehavior {
    public register(username: string, password: string, confirmPassword: string, email: string, callback: Function) {
        let userData = {
            Username: username,
            Password: password,
            ConfirmPassword: confirmPassword,
            Email: email
        };

        post('account', 'register', userData, '')
            .then(function () {
                observer.showSuccess('User registration successful.');
                let loginData = {
                    Username: username,
                    Password: password,
                    grant_type: "password"
                }

                post('account', 'login', loginData)
                    .then(function (userInfo) {
                        observer.saveSession(userInfo);
                        callback(true);
                    });
            });
    }
}