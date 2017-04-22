import { RouteComponentProps } from "react-router";
import { IRestaurantModel } from "./restaurants.model";

export interface RestaurantsGridProps extends RouteComponentProps<any> {
    restaurants: Array<IRestaurantModel>
}