import * as React from 'react';
import { RouteComponentProps } from "react-router";

export default class Greeting extends React.Component<GreetingProps, any> {
    render() {
        if (this.props.userName === '' || this.props.userName === undefined) {
            return null;
        } else {
            return (
                <span className="useronly" id="spanMenuLoggedInUser">Welcome, {this.props.userName}<span className="">{this.props.role}</span></span>
            );
        }
    }
}

export interface GreetingProps extends RouteComponentProps<any> {
    userName: string,
    role: string,
}