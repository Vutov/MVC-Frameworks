import { RouteComponentProps } from "react-router";

export interface RestaurantsGridProps extends RouteComponentProps<any> {
    restaurants: Array<RestaurantModel>
}

export interface RestaurantModel {
    id: string,
    name: string,
    townName: string,
    ratings: Array<Rating>,
    ownerName: string
}

export interface Rating {
    star: number
}