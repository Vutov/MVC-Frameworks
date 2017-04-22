import * as React from 'react'
import { RestaurantsBehavior } from './restaurants.behavior'
import { RestaurantsAddProps } from './restaurants-add.model'
import { RestaurantsAddComponent } from './restaurants-add.component'
import { RestaurantsGridComponent } from './restaurants-grid.components'

export class RestaurantsComponent extends React.Component<RestaurantsAddProps, any> {

    constructor(props) {
        super(props);

        this.state = {
            towns: [],
            townID: undefined
        }
    }
    private behavior: RestaurantsBehavior = new RestaurantsBehavior()

    componentDidMount() {
        this.behavior.getTowns(function (data) {
            this.setState({ towns: data, townID: data[0].id.toString() });
        }.bind(this));
    }

    onChangeHandler(event) {
        let data = {};
        data[event.target.name] = event.target.value
        this.setState(data);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        // this.behavior.register(this.state.username, this.state.password, this.state.confirmPassword, this.state.email, function(){
        //   this.props.history.push('/');
        // }.bind(this));
    }

    render() {
        return (
            <section>
                <RestaurantsGridComponent
                    restaurants={this.state.restaurants}
                    history={this.state.history}
                    location={this.state.location}
                    match={this.state.match}
                />

                <RestaurantsAddComponent
                    towns={this.state.towns}
                    history={this.state.history}
                    location={this.state.location}
                    match={this.state.match}
                />
            </section>
        )
    }
}