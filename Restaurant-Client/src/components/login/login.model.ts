import { RouteComponentProps } from "react-router";

export interface LoginProps extends RouteComponentProps<any> {
    username: string,
    password: string
}
