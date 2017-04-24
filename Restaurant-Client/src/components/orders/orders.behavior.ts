import { get, post } from '../../services/requester';
import observer from '../../services/observer'
import { OrderModel, IOrderModel } from "./orders.model";

export class OrdersBehavior {
    public getOrders(pageSize: number, index: number, callback: Function) {
        let url = 'orders?startPage=' + index + '&limit=' + pageSize;
        get('', url, 'basic')
            .then(function (data) {
                let mappedData: IOrderModel[] = [];
                data.map(function (d) {
                    mappedData.push(new OrderModel(
                        d.id,
                        d.meal.name,
                        d.meal.price,
                        d.meal.type,
                        d.createdOn,
                    ));
                });

                callback(mappedData);
            });
    }
}