import * as React from 'react'
import { LoginProps } from './login.model'
import { LoginBehavior } from './login.behavior'
import { Controls } from '../common/controls'
import {Button} from 'react-bootstrap'

export class LoginComponent extends React.Component<LoginProps, any> {

    private behavior: LoginBehavior = new LoginBehavior()

    onChangeHandler(event) {
        let data = {};
        data[event.target.name] = event.target.value
        this.setState(data);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.behavior.login(this.state.username, this.state.password, function () {
            this.props.history.push('/');
        }.bind(this));
    }

    render() {
        return (
            // TODO Center
            <section className='container'>
                <h1 className='lead'>Please login:</h1>
                <form onSubmit={this.onSubmitHandler.bind(this)}>
                    <Controls.FieldGroup
                        id="Username"
                        type="text"
                        label="Username:"
                        placeholder="Username"
                        name="username"
                        required
                        onChange={this.onChangeHandler.bind(this)}
                        value={this.props.username}
                    />
                    <Controls.FieldGroup
                        id="Password"
                        type="password"
                        label="Password:"
                        placeholder="Password"
                        name="password"
                        required
                        onChange={this.onChangeHandler.bind(this)}
                        value={this.props.username}
                    />
                    <Button>Login</Button>
                </form>
            </section>
        )
    }
}