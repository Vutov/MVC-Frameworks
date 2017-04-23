import * as React from 'react'
import { MealsBehavior } from "./meals.behavior";
import { ISelectable } from "./meals.model";

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
            <form id="formAddMeal" onSubmit={this.onSubmitHandler.bind(this)}>
                <label htmlFor="name">Name</label>
                <input required type="text" name='name' onChange={this.onChangeHandler.bind(this)} />
                {this.renderSelect("Type", "typeID", this.state.types || [])}
                {this.renderSelect("Restaurant", "restaurantID", this.state.restaurants || [])}
                <label htmlFor="price">Price</label>
                <input required type="number" name='price' min="1" max="10000" onChange={this.onChangeHandler.bind(this)} />
                <input type="submit" value="Save" />
            </form>
        );
    }

    // TODO extact in common
    renderSelect(title: string, name: string, elements: Array<ISelectable>) {
        return (
            <div>
                <label htmlFor={name}>{title}</label>
                <select name={name} onChange={this.onChangeHandler.bind(this)}>
                    {
                        elements.map(function (e: ISelectable) {
                            return <option key={e.id} value={e.id}>{e.name}</option>
                        }.bind(this))
                    }
                </select>
            </div>
        );
    }

    render() {
        return (
            <section>
                {this.renderAddMeal()}
            </section>
        )
    }
}