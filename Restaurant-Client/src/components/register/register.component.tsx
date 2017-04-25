import * as React from 'react'
import { RegisterProps } from './register.model'
import { RegisterBehavior } from './register.behavior'

export class RegisterComponent extends React.Component<RegisterProps, any> {

    private behavior: RegisterBehavior = new RegisterBehavior()

    onChangeHandler(event) {
        let data = {};
        data[event.target.name] = event.target.value
        this.setState(data);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.behavior.register(this.state.username, this.state.password, this.state.confirmPassword, this.state.email, function(){
          this.props.history.push('/');
        }.bind(this));
    }

    render() {
        return (
             <section id="viewRegister">
                <h1>Please register here</h1>
                <form id="formRegister" onSubmit={this.onSubmitHandler.bind(this)}>
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
                    <label>
                        <div>Password:</div>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={this.props.confirmPassword}
                            onChange={this.onChangeHandler.bind(this)}
                            required />
                    </label>
                    <label>
                        <div>Email:</div>
                        <input
                            type="email"
                            name="email"
                            value={this.props.email}
                            onChange={this.onChangeHandler.bind(this)} 
                            required />
                    </label>
                    <div>
                        <input type="submit" value="Register"/>
                    </div>
                </form>
            </section>
        )
    }
}