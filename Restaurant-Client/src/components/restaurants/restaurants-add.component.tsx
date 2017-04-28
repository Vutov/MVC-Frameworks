import * as React from 'react'
import { RestaurantsBehavior } from './restaurants.behavior'
import { RestaurantsAddProps } from './restaurants-add.model'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { Controls } from "../common/controls";

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
            <section className='container'>
                <form onSubmit={this.onSubmitHandler.bind(this)}>
                    <FormGroup>
                        <ControlLabel>City:</ControlLabel>
                        <FormControl componentClass="select" placeholder="City" name='townID' onChange={this.onChangeHandler.bind(this)}>
                            {
                                this.props.towns.map(function (town) {
                                    return <option key={town.id} value={town.id}>{town.name}</option>
                                }.bind(this))
                            }
                        </FormControl>
                    </FormGroup>
                    <Controls.FieldGroup
                        id="Name"
                        type="text"
                        label="Name:"
                        placeholder="Name"
                        name="restaurantName"
                        required
                        onChange={this.onChangeHandler.bind(this)}
                    />
                    <Button type='submit'>Save</Button>
                </form>
            </section>
        )
    }
}