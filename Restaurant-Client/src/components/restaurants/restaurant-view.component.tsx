import * as React from 'react'
import { Link } from 'react-router-dom'
import observer from '../../services/observer'
import { RestaurantsBehavior } from './restaurants.behavior'
import { IRestaurantModel } from "./restaurants.model";
import { Label, Panel, Button, Table, Col, Row } from 'react-bootstrap'
import { Controls } from "../common/controls";

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
                <section>
                    <Panel header={"Name: " + this.state.restaurant.name}>
                        <div>{"Rating: " + (this.state.restaurant.rating === 0 ? "no data" : this.state.restaurant.rating)}</div>
                        <div>Town: <Link to={"/restaurants/" + this.state.restaurant.town.id}>{this.state.restaurant.town.name}</Link></div>
                    </Panel>
                </section>
            );
        }

        return Restaurant;
    }

    renderRating() {
        let Rating = (
            <section>
                <form onSubmit={this.onSubmitHandler.bind(this)}>
                    <Controls.FieldGroup
                        id="Rate"
                        type="number"
                        label="Rate:"
                        placeholder="Rate"
                        name="stars"
                        required
                        min="1"
                        max="10"
                        onChange={this.onChangeHandler.bind(this)}
                    />
                    <Button type='submit'>Save Rating</Button>
                </form>
            </section>
        );

        return Rating;
    }

    renderMeals() {
        let Meals = (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        {observer.isAdmin() ? <th>Delete</th> : null}
                        <th>Order</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.meals.map(function (meal) {
                            return (
                                <tr key={meal.id}>
                                    <td>{meal.name}</td>
                                    <td>{meal.type}</td>
                                    <td>{meal.price}</td>
                                    {observer.isAdmin() ? <td><Button onClick={this.deleteMeal.bind(this, meal.id)}>Delete</Button></td> : null}
                                    <td><Button onClick={this.orderMeal.bind(this, meal.id)}>Order</Button></td>
                                </tr>
                            );
                        }.bind(this))
                    }
                </tbody>
            </Table>
        );

        return Meals;
    }

    render() {
        return (
            <section className='margin-10'>
                <Row className="show-grid">
                    <Col className='container' xs={12} md={5}>
                        <h1 className='lead'>Restaurant</h1>
                        {this.renderRestaurant()}
                        <h3 className='lead'>Rate Restaurant</h3>
                        {this.renderRating()}
                    </Col>
                    <Col className='container' xs={12} md={7}>
                        <h2 className='lead'>Meals</h2>
                        {this.renderMeals()}
                    </Col >
                </Row>
            </section >
        )
    }
}