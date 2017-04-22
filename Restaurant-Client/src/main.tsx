import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, HashRouter } from 'react-router-dom';
import { createHashHistory } from 'history';
import { App } from './аpp';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/login/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';

const history = createHashHistory();

ReactDOM.render(
  <HashRouter>
    <Router history={history} >
      <App>
        <Route exact={true} path="/" component={HomeComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/logout" component={LogoutComponent} />
        <Route path="/register" component={RegisterComponent} />
        <Route path="/restaurants" component={RestaurantsComponent} />
        {/*<Route path='*' component={NotFound} />*/}
      </App>
    </Router>
  </HashRouter>

  ,
  document.getElementById('root')
);
