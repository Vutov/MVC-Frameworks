import * as React from 'react'
import { RestaurantsBehavior } from './restaurants.behavior'
import { RestaurantsAddProps } from './restaurants-add.model'
import { RestaurantsAddComponent } from './restaurants-add.component'
import { RestaurantsGridComponent } from './restaurants-grid.components'
import { IRestaurantModel } from "./restaurants.model";

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
        this.updateTowns()
        this.updateGrid()
    }

    updateGrid(){
         this.behavior.getRestaurants(function (data: Array<IRestaurantModel>) {
            this.setState({ restaurants: data });
        }.bind(this));
    }

    updateTowns(){
        this.behavior.getTowns(function (data) {
            this.setState({ towns: data, townID: data[0].id.toString() });
        }.bind(this));
    }

    render() {
        return (
            <section>
                <RestaurantsAddComponent
                    towns={this.state.towns}
                    defaultTownID={this.state.townID}
                    history={this.state.history}
                    location={this.state.location}
                    match={this.state.match}
                    updateGrid={this.updateGrid.bind(this)}
                />

                <RestaurantsGridComponent
                    restaurants={this.state.restaurants}
                    history={this.state.history}
                    location={this.state.location}
                    match={this.state.match}
                />
            </section>
        )
    }
}