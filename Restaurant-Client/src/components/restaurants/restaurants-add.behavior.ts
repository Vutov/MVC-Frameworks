import { post, get } from '../../services/requester';
import observer from '../../services/observer'

export class RestaurantsAddBehavior {
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
            .then(function(data){
                callback(data);
            });
    }
}