import React from 'react';
import ReactDOM from 'react-dom';
import './css/custom-theme/jquery-ui-1.10.0.custom.css';
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";

import HomePage from './pages/HomePage';
import WaitersPage from './pages/waiters/WaitersPage';

import registerServiceWorker from './registerServiceWorker';
import MenuPage from "./pages/menu/MenuPage";
import EveningPage from "./pages/evening/EveningPage";
import TablesPage from "./pages/tables/TablesPage";
import AdditionsPage from "./pages/additions/AdditionsPage";
import PrintersPage from "./pages/printers/PrintersPage";
import LocationsPage from "./pages/locations/LocationsPage";

var $ = require('jquery');
global.jQuery = $;
global.Tether = require('tether');
require('bootstrap/dist/js/bootstrap.min');
require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/css/font-awesome.min.css');
require('./css/index.css');
ReactDOM.render(
    <BrowserRouter>
        <div>
            <main>
                <Switch>
                    <Route exact path="/restaurant" component={HomePage}/>
                    <Route path="/restaurant/printers" component={PrintersPage}/>
                    <Route path="/restaurant/locations" component={LocationsPage}/>
                    <Route path="/restaurant/tables" component={TablesPage}/>
                    <Route path="/restaurant/waiters" component={WaitersPage}/>
                    <Route path="/restaurant/additions" component={AdditionsPage}/>
                    <Route path="/restaurant/menu" component={MenuPage}/>
                    <Route path="/restaurant/evening" component={EveningPage}/>
                </Switch>
            </main>
        </div>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
