import * as React from 'react';
import { Link } from "react-router-dom";
import Greeting from './components/common/greeting';
import Infobox from './components/common/infobox';
import observer from './services/observer';

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

    render() {
        let navbar = {};
        if (!observer.isLogged()) {
            navbar = (
                <header id="menu">
                    <Link to="/" className="anonymous" id="linkMenuAppHome">Home</Link>
                    <Link to="/login" className="anonymous" id="linkMenuLogin">Login</Link>
                    <Link to="/register" className="anonymous" id="linkMenuRegister" >Register</Link>
                </header>
            );
        }
        else {
            let AdminPanel = null;
            if (observer.isAdmin()) {
                AdminPanel = <Link to="/admin" className="adminonly" id="linkMenuUserHome">Admin</Link>
            }

            navbar = (
                <header id="menu">
                    <Link to="/" className="useronly" id="linkMenuUserHome">Home</Link>
                    <Link to="/restaurants" className="useronly" id="linkMenuShop">Restaurants</Link>
                    <Link to="/meals" className="useronly" id="linkMenuCart">Meals</Link>
                    <Link to="/orders" className="useronly" id="linkMenuCart">Orders</Link>
                    {AdminPanel}
                    <Link to="/logout" className="useronly" id="linkMenuLogout">Logout</Link>
                    <Greeting userName={this.state.username} role={this.state.role} history={this.state.history} match={this.state.match} location={this.state.location} />
                </header>
            );
        }

        return (
            <div id="app">
                {navbar}
                <main id='main'>
                    <Infobox />
                    {this.props.children}
                </main>
                <footer>Shopping System - Simple SPA Application</footer>
            </div>
        )
    }
}