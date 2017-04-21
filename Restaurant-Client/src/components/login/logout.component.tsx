import * as React from 'react'
import { LoginBehavior } from './login.behavior'

export class LogoutComponent extends React.Component<any, any> {

    private behavior: LoginBehavior = new LoginBehavior()

    componentWillMount() {
        this.behavior.logout(function () {
            this.props.history.push('/');
        }.bind(this));
    }

    render() {
        return (
            <div>
                <span>Logout Page</span>
            </div>
        );
    }
}