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
require("./css/index.scss");

require('jquery-color-animation/jquery.animate-colors');

ReactDOM.render(<App/>, document.getElementById('root'));