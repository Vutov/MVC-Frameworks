import * as React from 'react';

export default class Greeting extends React.Component<any, any> {
    render() {
        if (this.props.user === '' || this.props.user === undefined) {
            return null;
        } else {
            return (
                <span className="useronly" id="spanMenuLoggedInUser">Welcome, {this.props.user}</span>
            );
        }
    }
}