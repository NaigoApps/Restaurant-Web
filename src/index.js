import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/custom-theme/jquery-ui-1.10.0.custom.css';
import {Route} from "react-router";
import {HashRouter} from "react-router-dom";

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
require('bootstrap/dist/js/bootstrap.min');
require('bootstrap/dist/css/bootstrap.min.css');
ReactDOM.render(
    <HashRouter>
        <div>
            <Route path="/" component={HomePage}/>
            <Route path="/printers" component={PrintersPage}/>
            <Route path="/locations" component={LocationsPage}/>
            <Route path="/tables" component={TablesPage}/>
            <Route path="/waiters" component={WaitersPage}/>
            <Route path="/additions" component={AdditionsPage}/>
            <Route path="/menu" component={MenuPage}/>
            <Route path="/evening" component={EveningPage}/>
        </div>
    </HashRouter>,
    document.getElementById('root'));
registerServiceWorker();
