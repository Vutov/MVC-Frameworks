import * as React from 'react';
import * as ReactDOM from 'react-dom';
import observer from './services/observer'
import { Router, Route, HashRouter, Redirect, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { App } from './аpp';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/login/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantsTownComponent } from './components/restaurants/restaurants-town.component';
import { RestaurantViewComponent } from './components/restaurants/restaurant-view.component';
import { MealsComponent } from './components/meals/meals.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { NotFoundComponent } from "./components/common/not-found.component";

const history = createHashHistory();

enum RouteType {
  Admin,
  User
}

const Authorized = ({ component: Component, routeType, ...rest }) => (
  <Route {...rest} render={renderProps => (
    (routeType == RouteType.User && observer.isLogged()) || (routeType == RouteType.Admin && observer.isAdmin()) ? (
      <Component {...renderProps} />
    ) : (
        <Redirect to={{
          pathname: observer.isLogged() && !observer.isAdmin() ? '/' : '/login',
          state: { from: renderProps.location }
        }} />
      )
  )} />
);

ReactDOM.render(
  <HashRouter>
    <Router history={history} >
      <App>
        <Switch>
          <Route path="/" exact={true} component={HomeComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/register" component={RegisterComponent} />
          <Authorized routeType={RouteType.User} path="/logout" component={LogoutComponent} />
          <Authorized routeType={RouteType.User} path="/restaurants" exact={true} component={RestaurantsComponent} />
          <Authorized routeType={RouteType.User} path="/restaurants/:townID" component={RestaurantsTownComponent} />
          <Authorized routeType={RouteType.User} path="/restaurant/:restaurantID" component={RestaurantViewComponent} />
          <Authorized routeType={RouteType.User} path="/meals" component={MealsComponent} />
          <Authorized routeType={RouteType.User} path="/orders" component={OrdersComponent} />
          <Authorized routeType={RouteType.Admin} path="/admin" component={AdminPanelComponent} />
          <Route component={NotFoundComponent} />
        </Switch>
      </App>
    </Router>
  </HashRouter>

  ,
  document.getElementById('root')
);
