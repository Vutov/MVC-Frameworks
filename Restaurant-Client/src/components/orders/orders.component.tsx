import * as React from 'react'
import { OrdersBehavior } from './orders.behavior'
import { IOrderModel } from "./orders.model";
import { Formatter } from "../common/formatters";

export class OrdersComponent extends React.Component<any, any> {

    constructor() {
        super();

        this.state = {
            pageSize: 10,
            currentIndex: 0,
            orders: []
        }
    }


    private behavior: OrdersBehavior = new OrdersBehavior()

    componentDidMount() {
        this.updateGrid(0);
    }

    updateGrid(indexToAdd: number) {
        let index = this.state.currentIndex + indexToAdd;
        if (index < 0) {
            return;
        }
        
        this.behavior.getOrders(this.state.pageSize, index, function (data: IOrderModel) {
            this.setState({ orders: data, currentIndex: index });
        }.bind(this));
    }

    render() {
        return (
            <section>
                <h1>Top {this.state.pageSize} orders</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orders.map(function (order: IOrderModel) {
                                return (
                                    <tr key={order.id}>
                                        <td>{order.name}</td>
                                        <td>{order.type}</td>
                                        <td>{order.price}</td>
                                        <td>{Formatter.dateFormat(order.createdOn)}</td>
                                    </tr>
                                );
                            }.bind(this))
                        }
                    </tbody>
                </table>
                <button onClick={this.updateGrid.bind(this, -1)}>&lt;</button>
                <button onClick={this.updateGrid.bind(this, 0)}>Reload</button>
                <button onClick={this.updateGrid.bind(this, 1)}>&gt;</button>
            </section>
        )
    }
}