import * as React from 'react'
import { RestaurantsGridProps } from './restaurants-grid.model'
import { IRestaurantModel } from "./restaurants.model";
import { RestaurantsBehavior } from "./restaurants.behavior";
import { RestaurantsGridComponent } from "./restaurants-grid.components";

export class RestaurantsTownComponent extends React.Component<RestaurantsGridProps, any> {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: []
        }
    }

    private behavior: RestaurantsBehavior = new RestaurantsBehavior()
    
    componentDidMount() {
        let townID = this.props.match.params.townID;
        this.behavior.getRestaurantsByTownID(townID, function (data: Array<IRestaurantModel>) {
            this.setState({ restaurants: data });
        }.bind(this));
    }

    render() {
        return (
            <RestaurantsGridComponent
                    restaurants={this.state.restaurants}
                    history={this.state.history}
                    location={this.state.location}
                    match={this.state.match}
                />
        )
    }
}