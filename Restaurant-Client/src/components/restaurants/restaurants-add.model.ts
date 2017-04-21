import { RouteComponentProps } from "react-router";

export interface RestaurantsAddProps extends RouteComponentProps<any> {
    name: string,
    townID: number
}
