import {login, logout} from '../../services/user'

export class LoginBehavior {

  public login(username: string, password: string, callback: Function) {
      login(username, password, callback);
  }

  public logout(callback: Function){
      logout(callback);
  }
}
