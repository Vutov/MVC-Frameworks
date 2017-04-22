export interface IRestaurantModel {
    id: number,
    name: string,
    townName: string,
    townID: number,
    ratings: number
}

export class RestaurantModel implements IRestaurantModel {
    id: number;
    name: string;
    townName: string;
    townID: number;
    ratings: number;

    constructor(id: number, name: string, townName: string, townID: number, ratings:number) {
        this.id = id;
        this.name = name;
        this.townName = townName;
        this.townID = townID;
        this.ratings = ratings;
    }
}   