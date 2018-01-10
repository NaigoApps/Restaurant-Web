import React from 'react';
import ReactDOM from 'react-dom';
import './css/custom-theme/jquery-ui-1.10.0.custom.css';
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";

import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import WaitersPage from './pages/waiters/WaitersPage';

import registerServiceWorker from './registerServiceWorker';
import MenuPage from "./pages/menu/MenuPage";
import EveningPage from "./pages/evening/EveningPage";
import TablesPage from "./pages/tables/TablesPage";
import AdditionsPage from "./pages/additions/AdditionsPage";
import PrintersPage from "./pages/printers/PrintersPage";
import LocationsPage from "./pages/locations/LocationsPage";

global.jQuery = require('jquery');
global.$ = global.jQuery;
global.Tether = require ('tether');
require('jquery-ui/ui/core');
require('jquery-ui/ui/widgets/draggable');
require('jquery-ui-touch-punch/jquery.ui.touch-punch');

require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/css/font-awesome.min.css');
require('./css/index.css');

ReactDOM.render(
    <BrowserRouter>
        <div>
            <main>
                <Switch>
                    <Route exact path="/restaurant" component={HomePage}/>
                    <Route exact path="/restaurant/settings" component={SettingsPage}/>
                    <Route path="/restaurant/settings/printers" component={PrintersPage}/>
                    <Route path="/restaurant/settings/locations" component={LocationsPage}/>
                    <Route path="/restaurant/settings/tables" component={TablesPage}/>
                    <Route path="/restaurant/settings/waiters" component={WaitersPage}/>
                    <Route path="/restaurant/settings/additions" component={AdditionsPage}/>
                    <Route path="/restaurant/settings/menu" component={MenuPage}/>
                    <Route path="/restaurant/evening" component={EveningPage}/>
                </Switch>
            </main>
        </div>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
