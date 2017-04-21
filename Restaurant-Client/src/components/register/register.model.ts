import { RouteComponentProps } from "react-router";

export interface RegisterProps extends RouteComponentProps<any> {
    username: string,
    password: string,
    confirmPassword: string,
    email: string
}
