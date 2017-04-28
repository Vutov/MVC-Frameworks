import * as React from 'react'
import { get, post } from '../../services/requester'
import { Table, Button } from 'react-bootstrap'

export class AdminPanelComponent extends React.Component<any, any> {
    constructor() {
        super();

        this.state = {
            users: []
        }
    }

    componentWillMount() {
        get('roles', 'users', 'basic')
            .then(function (data) {
                this.setState({ users: data });
            }.bind(this));
    }

    makeAdmin(username: string, email: string) {
        let data = { Name: username, Email: email };
        post('roles', 'give/admin', data, 'basic');
    }

    render() {
        return (
            <section>
                <div className='container'>
                    <h1 className='lead'>Admin Panel</h1>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (this.state.users || []).map(function (u) {
                                    return (
                                        <tr key={u.id}>
                                            <td>{u.username}</td>
                                            <td>{u.email}</td>
                                            <td><Button onClick={this.makeAdmin.bind(this, u.username, u.email)}>Make Admin</Button></td>
                                        </tr>
                                    )
                                }.bind(this))
                            }
                        </tbody>
                    </Table>
                </div>
            </section>
        )
    }
}