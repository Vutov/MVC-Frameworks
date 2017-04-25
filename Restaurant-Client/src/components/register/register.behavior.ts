import { get, post } from '../../services/requester';
import { LoginBehavior } from '../login/login.behavior'
import observer from '../../services/observer'

export class RegisterBehavior {
    private loginBehavior: LoginBehavior = new LoginBehavior()

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

                this.loginBehavior.login(username, password, callback);
            }.bind(this));
    }
}