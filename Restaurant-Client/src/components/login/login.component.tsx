import * as React from 'react'
import { LoginProps } from './login.model'
import { LoginBehavior } from './login.behavior'

export class LoginComponent extends React.Component<LoginProps, any> {

    private behavior: LoginBehavior = new LoginBehavior()

    onChangeHandler(event) {
        let data = {};
        data[event.target.name] = event.target.value
        this.setState(data);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.behavior.login(this.state.username, this.state.password, function(){
          this.props.history.push('/');
        }.bind(this));
    }

    render() {
        return (
            <section id="viewLogin">
                <h1>Please login</h1>
                <form id="formLogin" onSubmit={this.onSubmitHandler.bind(this)}>
                    <label>
                        <div>Username:</div>
                        <input
                            type="text"
                            name="username"
                            value={this.props.username}
                            onChange={this.onChangeHandler.bind(this)}
                            required />
                    </label>
                    <label>
                        <div>Password:</div>
                        <input
                            type="password"
                            name="password"
                            value={this.props.password}
                            onChange={this.onChangeHandler.bind(this)}
                            required />
                    </label>
                    <div>
                        <input type="submit" value="Login" />
                    </div>
                </form>
            </section>
        )
    }
}