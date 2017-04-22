import { post, get } from '../../services/requester';
import observer from '../../services/observer'
import { RestaurantModel, IRestaurantModel } from "./restaurants.model";

export class RestaurantsBehavior {
    public register(name: string, townID: number, callback: Function) {
        let data = {
            Name: name,
            Password: townID
        };

        post('restaurants', '', data, 'basic')
            .then(function () {
                observer.showSuccess('Restaurant added successfully.');
                callback(true);
            });
    }

    public getTowns(callback: Function) {
        get('restaurants', 'towns')
            .then(function (data) {
                callback(data);
            });
    }

    public getRestaurants(callback: Function) {
        get('restaurants', '')
            .then(function (data) {
                callback(this.mapRestaurants(data));
            }.bind(this))
    }

    public getRestaurantsByTownID(townID: number, callback: Function) {
        get('restaurants', '?townid=' + townID)
            .then(function (data) {
                callback(this.mapRestaurants(data));
            }.bind(this))
    }

    mapRestaurants(data) {
        let mappedData: IRestaurantModel[] = [];
        data.map(function (d) {
            mappedData.push(new RestaurantModel(
                d.id,
                d.name,
                d.town.name,
                d.town.id,
                d.rating,
            ));
        });

        return mappedData;
    }

    public addRestaurant(name: string, townID: number, callback?: Function) {
        let data = {
            Name: name,
            TownId: townID
        }

        post('restaurants', '', data, 'basic')
            .then(function (data) {
                if (callback) {
                    callback(data);
                }
            });
    }
}