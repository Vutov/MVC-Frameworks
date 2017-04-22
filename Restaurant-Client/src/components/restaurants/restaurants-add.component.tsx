import * as React from 'react'
import { RestaurantsBehavior } from './restaurants.behavior'
import { RestaurantsAddProps } from './restaurants-add.model'

export class RestaurantsAddComponent extends React.Component<RestaurantsAddProps, any> {

    constructor(props) {
        super(props);

        this.state = {
            towns: [],
            townID: undefined,
            restaurantName: undefined
        }
    }

    private behavior: RestaurantsBehavior = new RestaurantsBehavior()

    onChangeHandler(event) {
        let data = {};
        data[event.target.name] = event.target.value
        this.setState(data);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.behavior.addRestaurant(this.state.restaurantName, this.state.townID || this.props.defaultTownID, this.props.updateGrid);
    }

    render() {
        return (
            <section>
                <form id="formAddRestaurant" onSubmit={this.onSubmitHandler.bind(this)}>
                    <label htmlFor="townID">City</label>
                    <select name='townID' onChange={this.onChangeHandler.bind(this)}>
                        {
                            this.props.towns.map(function (town) {
                                return <option key={town.id} value={town.id}>{town.name}</option>
                            }.bind(this))
                        }
                    </select>
                    <label htmlFor="restaurantName">Name</label>
                    <input type="text" name='restaurantName' onChange={this.onChangeHandler.bind(this)} />
                    <input type="submit" value="Save" />
                </form>
            </section>
        )
    }
}