import * as React from 'react'
import { Link } from "react-router-dom";

export class HomeComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { user: sessionStorage.getItem('username') };
    }
    
    render() {
        if (this.state.user) {
            return (
                <section id="viewUserHome">
                    <h1 id="viewUserHomeHeading">Welcome, {this.state.user}!</h1>
                    <Link to="/restaurants" id="linkUserHomeShop">Restaurants</Link>
                    <Link to="/meals" id="linkUserHomeShop">Meals</Link>
                    <Link to="/orders" id="linkUserHomeCart">Orders</Link>
                </section>
            )
        } else {
            return (
                <section id="viewAppHome">
                    <h1>Welcome</h1>
                    Welcome to our shopping system.
                </section>
            );
        }
    }
}