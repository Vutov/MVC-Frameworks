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
import { RestaurantsTownComponent } from './components/restaurants/restaurants-town.component';
import { RestaurantViewComponent } from './components/restaurants/restaurant-view.component';
import { MealsComponent } from './components/meals/meals.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { NotFoundComponent } from "./components/common/not-found.component";

const history = createHashHistory();

ReactDOM.render(
  <HashRouter>
    <Router history={history} >
      <App>
        <Route exact={true} path="/" component={HomeComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/logout" component={LogoutComponent} />
        <Route path="/register" component={RegisterComponent} />
        <Route exact={true} path="/restaurants" component={RestaurantsComponent} />
        <Route path="/restaurants/:townID" component={RestaurantsTownComponent} />
        <Route path="/restaurant/:restaurantID" component={RestaurantViewComponent} />
        <Route path="/meals" component={MealsComponent} />
        <Route path="/orders" component={OrdersComponent} />
        <Route path="/admin" component={AdminPanelComponent} />
        {/*<Route path='*' component={NotFoundComponent} />*/}
      </App>
    </Router>
  </HashRouter>

  ,
  document.getElementById('root')
);
