import * as React from 'react'
import {Link} from 'react-router-dom';
import { RestaurantsGridProps } from './restaurants-grid.model'
import { IRestaurantModel } from "./restaurants.model";

export class RestaurantsGridComponent extends React.Component<RestaurantsGridProps, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Restaurant Name</th>
                        <th>Ratings</th>
                        <th>Town Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (this.props.restaurants || []).map(function (r : IRestaurantModel) {
                            return (
                                <tr key={r.id}>
                                    <td><Link to={"/restaurant/" + r.id}>{r.id}</Link></td>
                                    <td>{r.name}</td>
                                    <td>{r.ratings === 0 ? "no data" : r.ratings}</td>
                                    <td><Link to={"/restaurants/" + r.townID}>{r.townName}</Link></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </section>
        )
    }
}