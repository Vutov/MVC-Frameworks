import * as React from 'react'
import { MealsBehavior } from "./meals.behavior";
import { ISelectable } from "./meals.model";
import { Button } from 'react-bootstrap'
import { Controls } from "../common/controls";
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

export class MealsComponent extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            types: [],
            defaultRestaurantID: undefined,
            defaultTypeID: undefined,
            name: undefined,
            typeID: undefined,
            restaurantID: undefined,
            price: undefined
        }
    }

    private behavior: MealsBehavior = new MealsBehavior()

    componentDidMount() {
        this.behavior.getRestaurants(function (data: Array<ISelectable>) {
            this.setState({ restaurants: data, defaultRestaurantID: data[0].id });
        }.bind(this));

        this.behavior.getMealTypes(function (data: Array<ISelectable>) {
            this.setState({ types: data, defaultTypeID: data[0].id });
        }.bind(this));
    }

    onChangeHandler(event) {
        let data = {};
        data[event.target.name] = event.target.value
        this.setState(data);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        let restaurantID = this.state.restaurantID || this.state.defaultRestaurantID;
        let typeID = this.state.typeID || this.state.defaultTypeID
        this.behavior.addMeal(this.state.name, restaurantID, typeID, this.state.price, function () {
            this.props.history.push('/restaurant/' + restaurantID);
        }.bind(this));
    }

    renderAddMeal() {
        return (
            <form onSubmit={this.onSubmitHandler.bind(this)}>
                <Controls.FieldGroup
                    id="Name"
                    type="text"
                    label="Name:"
                    placeholder="Name"
                    name="name"
                    required
                    onChange={this.onChangeHandler.bind(this)}
                />
                {this.renderSelect("Type", "typeID", this.state.types || [])}
                {this.renderSelect("Restaurant", "restaurantID", this.state.restaurants || [])}
                <Controls.FieldGroup
                    id="Price"
                    type="number"
                    label="Price:"
                    placeholder="Price"
                    name="price"
                    required
                    onChange={this.onChangeHandler.bind(this)}
                    min="1"
                    max="10000"
                />
                <Button type='submit'>Save</Button>
            </form>
        );
    }

    renderSelect(title: string, name: string, elements: Array<ISelectable>) {
        return (
            <FormGroup>
                <ControlLabel>{title}</ControlLabel>
                <FormControl componentClass="select" placeholder={title} name={name} onChange={this.onChangeHandler.bind(this)}>
                    {
                        elements.map(function (e: ISelectable) {
                            return <option key={e.id} value={e.id}>{e.name}</option>
                        }.bind(this))
                    }
                </FormControl>
            </FormGroup>
        );
    }

    render() {
        return (
            <section>
                <div className='container'>
                    <h1 className='lead'>Add Meal</h1>
                    {this.renderAddMeal()}
                </div>
            </section>
        )
    }
}