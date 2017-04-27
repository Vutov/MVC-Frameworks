import * as React from 'react'
import { Link } from 'react-router-dom'
import observer from '../../services/observer'
import { RestaurantsBehavior } from './restaurants.behavior'
import { IRestaurantModel } from "./restaurants.model";

export class RestaurantViewComponent extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            restaurant: undefined,
            stars: undefined,
            meals: []
        }
    }

    private behavior: RestaurantsBehavior = new RestaurantsBehavior()

    // TODO Extract in class and inherit
    onChangeHandler(event) {
        let data = {};
        data[event.target.name] = event.target.value
        this.setState(data);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.behavior.rateRestaurant(this.state.stars, this.props.match.params.restaurantID, this.updateGrid.bind(this));
    }

    componentDidMount() {
        this.updateGrid();
        this.getMeals();
    }

    updateGrid() {
        this.behavior.getRestaurant(this.props.match.params.restaurantID, function (data) {
            this.setState({ restaurant: data });
        }.bind(this));
    }

    getMeals() {
        this.behavior.getMealsForRestaurant(this.props.match.params.restaurantID, function (data) {
            this.setState({ meals: data });
        }.bind(this));
    }

    deleteMeal(id: number) {
        this.behavior.deleteMeal(id, this.getMeals.bind(this));
    }

    orderMeal(id: number) {
        this.behavior.orderMeal(id);
    }

    renderRestaurant() {
        let Restaurant = null;
        if (this.state.restaurant) {
            Restaurant = (
                <section className='container' >
                    <label>Name</label>
                    <div>{this.state.restaurant.name}</div>
                    <label>Rating</label>
                    <div>{this.state.restaurant.rating === 0 ? "no data" : this.state.restaurant.rating}</div>
                    <label>Town</label>
                    <div><Link to={"/restaurants/" + this.state.restaurant.town.id}>{this.state.restaurant.town.name}</Link></div>
                </section>
            );
        }

        return Restaurant;
    }

    renderRating() {
        let Rating = (
            <form id="formAddStars" onSubmit={this.onSubmitHandler.bind(this)}>
                <label htmlFor="stars">Rate</label>
                <input name="stars" type="number" min="1" max="10" onChange={this.onChangeHandler.bind(this)} />
                <input type="submit" value="Save" />
            </form>
        );

        return Rating;
    }

    renderMeals() {
        let DeletHeader = null;
        if (observer.isAdmin()) {
            DeletHeader = <th>Delete</th>
        }

        let Meals = (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        {DeletHeader}
                        <th>Order</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.meals.map(function (meal) {
                            let DeleteMeal = null;
                            if (observer.isAdmin()) {
                                DeleteMeal = <td><button onClick={this.deleteMeal.bind(this, meal.id)}>Delete</button></td>
                            }

                            return (
                                <tr key={meal.id}>
                                    <td>{meal.name}</td>
                                    <td>{meal.type}</td>
                                    <td>{meal.price}</td>
                                    {DeleteMeal}
                                    <td><button onClick={this.orderMeal.bind(this, meal.id)}>Order</button></td>
                                </tr>
                            );
                        }.bind(this))
                    }
                </tbody>
            </table>
        );

        return Meals;
    }

    render() {
        return (
            <section>
                <h1>Restaurant</h1>
                {this.renderRestaurant()}
                <h2>Meals</h2>
                {this.renderMeals()}
                <h3>Rate Restaurant</h3>
                {this.renderRating()}
            </section>
        )
    }
}