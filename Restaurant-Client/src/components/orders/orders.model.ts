export interface IOrderModel {
    id: number,
    name: string,
    price: number,
    type: string,
    createdOn: Date
}

export class OrderModel implements IOrderModel {
    id: number;
    name: string;
    price: number;
    type: string;
    createdOn: Date;

    constructor(id: number, name: string, price: number, type: string, createdOn: Date) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.createdOn = new Date(createdOn);
    }
}   