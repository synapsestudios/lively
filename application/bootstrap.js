/* global window */
'use strict';

var React  = require('react');
var routes = require('./routes');

React.initializeTouchEvents(true);

React.renderComponent(routes, window.document.body);
