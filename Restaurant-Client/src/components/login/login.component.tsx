import * as React from 'react'
import { LoginProps } from './login.model'
import { LoginBehavior } from './login.behavior'
import { Controls } from '../common/controls'
import { Button, Col } from 'react-bootstrap'

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
            <section className='container'>
                <Col md={6} mdOffset={3} xs={8} xsOffset={2}>
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
                        />
                        <Controls.FieldGroup
                            id="Password"
                            type="password"
                            label="Password:"
                            placeholder="Password"
                            name="password"
                            required
                            onChange={this.onChangeHandler.bind(this)}
                        />
                        <Button type='submit'>Login</Button>
                    </form>
                </Col>
            </section>
        )
    }
}