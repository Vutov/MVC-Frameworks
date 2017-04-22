import * as React from 'react'
import { RestaurantsBehavior } from './restaurants.behavior'
import { RestaurantsGridProps, RestaurantModel } from './restaurants-grid.model'

export class RestaurantsGridComponent extends React.Component<RestaurantsGridProps, any> {

    constructor(props) {
        super(props);
    }

    private behavior: RestaurantsBehavior = new RestaurantsBehavior()

    componentDidMount() {
        this.behavior.getRestaurants(function (data: Array<RestaurantModel>) {
            this.setState({ Restaurants: data });
        }.bind(this));
    }

    render() {
        return (
            <section>
                <table>
                    <tr>tesa</tr>
                </table>
            </section>
        )
    }
}