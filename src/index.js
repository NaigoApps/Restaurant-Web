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


require("./sass/index.scss");
// require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/js/bootstrap.min');
require('font-awesome/css/font-awesome.min.css');

require('jquery-color-animation/jquery.animate-colors');

ReactDOM.render(<App/>, document.getElementById('root'));