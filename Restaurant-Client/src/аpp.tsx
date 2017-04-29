import * as React from 'react';
import { Link } from "react-router-dom";
import Infobox from './components/common/infobox';
import observer from './services/observer';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Badge } from 'react-bootstrap'

export class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false, username: '' };
        observer.onSessionUpdate = this.onSessionUpdate.bind(this);
    }

    componentDidMount() {
        this.onSessionUpdate();
    }

    onSessionUpdate() {
        let name = sessionStorage.getItem("username");
        if (name) {
            this.setState({ loggedIn: true, username: sessionStorage.getItem("username"), role: sessionStorage.getItem("role") });
        } else {
            this.setState({ loggedIn: false, username: '', role: '' });
        }
    }

    renderAnnonomusNavbar() {
        return (
            <Nav>
                <NavItem eventKey={1}><Link to="/">Home</Link></NavItem>
                <NavItem eventKey={2}><Link to="/login">Login</Link></NavItem>
                <NavItem eventKey={3}><Link to="/register">Register</Link></NavItem>
            </Nav>
        );
    }

    renderLoggedNavbar() {
        return (
            <Nav>
                <NavItem eventKey={1}><Link to="/">Home</Link></NavItem>
                <NavItem eventKey={2}><Link to="/restaurants">Restaurants</Link></NavItem>
                <NavItem eventKey={3}><Link to="/meals">Meals</Link></NavItem>
                <NavItem eventKey={4}><Link to="/orders">Orders</Link></NavItem>
                {observer.isAdmin() ? <NavItem eventKey={5}><Link to="/admin">Admin</Link></NavItem> : null}
            </Nav>
        );
    }

    renderNavbar() {
        return <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="https://softuni.bg/" target='blank'>Software University</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                {observer.isLogged() ? this.renderLoggedNavbar() : this.renderAnnonomusNavbar()}
                <Nav pullRight>
                    {observer.isLogged() ? <NavItem eventKey={1}><Link to="/logout">Logout</Link></NavItem> : null}
                </Nav>
                {observer.isLogged() ? <Navbar.Text pullRight>
                    <span>Welcome, {this.state.username} <Badge>{this.state.role}</Badge></span>
                </Navbar.Text> : null}
            </Navbar.Collapse>
        </Navbar>
    }

    renderFooter() {
        return (
            <footer className='footer'>
                <div className='container padding-10'>
                    <div className='text-center'>Shopping System - Simple SPA Application - Web Api, React, TypeScript - Spas Vutov</div>
                </div>
            </footer>
        )
    }

    render() {

        return (
            <div id="app">
                {this.renderNavbar.call(this)}
                <main id='main'>
                    <Infobox />
                    {this.props.children}
                </main>
                {this.renderFooter.call(this)}
            </div>
        )
    }
}