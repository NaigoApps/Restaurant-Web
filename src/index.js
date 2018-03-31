import React from 'react';
import ReactDOM from 'react-dom';
import './css/custom-theme/jquery-ui-1.10.0.custom.css';
import App from "./App";

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

ReactDOM.render(<App/>, document.getElementById('root'));
// ReactDOM.render(
//     <BrowserRouter>
//         <div>
//             <main>
//
//                 <Switch>
//                     <Route exact path="/restaurant" component={HomePage}/>
//                     <Route exact path="/restaurant/settings" component={SettingsPage}/>
//                     <Route path="/restaurant/settings/printers" component={PrintersPage}/>
//                     <Route path="/restaurant/settings/locations" component={LocationsPage}/>
//                     <Route path="/restaurant/settings/tables" component={TablesPage}/>
//                     <Route path="/restaurant/settings/waiters" component={WaitersPage}/>
//                     <Route path="/restaurant/settings/additions" component={AdditionsPage}/>
//                     <Route path="/restaurant/settings/customers" component={CustomersPage}/>
//                     <Route path="/restaurant/settings/menu" component={MenuPage}/>
//                     <Route path="/restaurant/evening" component={EveningPage}/>
//                 </Switch>
//             </main>
//         </div>
//     </BrowserRouter>,
//     document.getElementById('root'));
// registerServiceWorker();
