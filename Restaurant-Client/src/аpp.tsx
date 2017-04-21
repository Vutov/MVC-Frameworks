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
            this.setState({ loggedIn: true, username: sessionStorage.getItem("username") });
        } else {
            this.setState({ loggedIn: false, username: '' });
        }
    }

    render() {
        let navbar = {};
        if (!this.state.loggedIn) {
            navbar = (
                <header id="menu">
                    <Link to="/" className="anonymous" id="linkMenuAppHome">Home</Link>
                    <Link to="/login" className="anonymous" id="linkMenuLogin">Login</Link>
                    <Link to="/register" className="anonymous" id="linkMenuRegister" >Register</Link>
                  </header>
            );
        } else {
            navbar = (
                <header id="menu">
                    <Link to="/" className="useronly" id="linkMenuUserHome">Home</Link>
                    <Link to="/shop" className="useronly" id="linkMenuShop">Shop</Link>
                    <Link to="/cart" className="useronly" id="linkMenuCart">Cart</Link>
                    <Link to="/logout" className="useronly" id="linkMenuLogout">Logout</Link>
                    <Greeting user={this.state.username} />
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