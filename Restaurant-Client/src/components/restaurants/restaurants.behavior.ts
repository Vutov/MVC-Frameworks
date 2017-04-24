import { post, get, del } from '../../services/requester';
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
                    observer.showSuccess('Restaurant added successfully.');
                    callback(data);
                }
            });
    }

    public getRestaurant(id: number, callback: Function) {
        get('restaurants', '?restaurantid=' + id, 'basic')
            .then(function (data) {
                callback(data);
            });
    }

    public rateRestaurant(stars: number, retaurantID: number, callback: Function) {
        let body = {
            Stars: stars
        };

        post('restaurants', retaurantID + '/rate', body, 'basic')
            .then(function (data) {
                observer.showSuccess('Restaurant rated with ' + stars + '.');
                callback(data);
            });
    }

    public getMealsForRestaurant(retaurantID: number, callback: Function) {
        get('restaurants', retaurantID + '/meals', 'basic')
            .then(function (data) {
                callback(data);
            });
    }

    public deleteMeal(id: number, callback: Function) {
        del("meals", id, 'basic')
            .then(function () {
                observer.showSuccess('Meal deleted.');
                callback(true);
            })
    }

    public orderMeal(id: number, callback?: Function) {
        post('meals', id + '/order', { Quantity: 1 }, 'basic')
            .then(function (data) {
                observer.showSuccess('Meal ordered.');
                if (callback) {
                    callback(data);
                }
            })
    }
}