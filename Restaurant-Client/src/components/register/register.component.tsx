import * as React from 'react'
import { RegisterProps } from './register.model'
import { RegisterBehavior } from './register.behavior'
import { Controls } from "../common/controls";
import { Button, Col } from 'react-bootstrap'

export class RegisterComponent extends React.Component<RegisterProps, any> {

    private behavior: RegisterBehavior = new RegisterBehavior()

    onChangeHandler(event) {
        let data = {};
        data[event.target.name] = event.target.value
        this.setState(data);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.behavior.register(this.state.username, this.state.password, this.state.confirmPassword, this.state.email, function () {
            this.props.history.push('/');
        }.bind(this));
    }

    render() {
        return (
            <section className='container'>
                <Col md={6} mdOffset={3} xs={8} xsOffset={2}>
                    <h1 className='lead'>Please register here:</h1>
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
                        <Controls.FieldGroup
                            id="ConfirmPassword"
                            type="password"
                            label="Confirm Password:"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            required
                            onChange={this.onChangeHandler.bind(this)}
                        />
                        <Controls.FieldGroup
                            id="Email"
                            type="email"
                            label="Email:"
                            placeholder="Email"
                            name="email"
                            required
                            onChange={this.onChangeHandler.bind(this)}
                        />
                        <Button type='submit'>Register</Button>
                    </form>
                </Col>
            </section>
        )
    }
}