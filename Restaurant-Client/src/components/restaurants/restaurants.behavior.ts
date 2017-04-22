import { post, get } from '../../services/requester';
import observer from '../../services/observer'

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
                callback(data);
            })
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