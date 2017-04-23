import { post, get } from '../../services/requester';
import observer from '../../services/observer'

export class MealsBehavior {
    public getRestaurants(callback: Function) {
        get('restaurants', '', 'basic')
            .then(function (data) {
                callback(data);
            });
    }

    public getMealTypes(callback: Function) {
        get('meals', 'types', 'basic')
            .then(function (data) {
                callback(data);
            });
    }

    public addMeal(name: string, restaurantID: number, typeID: number, price: number, callback: Function){
        let mealData = {
            Name: name,
            Price: price,
            RestaurantID: restaurantID,
            TypeID: typeID
        }

        post('meals', '', mealData, 'basic')
        .then(function(data){
            callback(data);
        })
    }
}