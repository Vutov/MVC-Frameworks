import {register} from '../../services/user'

export class RegisterBehavior {

  public register(username: string, password: string, confirmPassword: string, email:string, callback: Function) {
      register(username, password, confirmPassword, email, callback);
  }
}
