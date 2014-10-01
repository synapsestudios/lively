/* global window */
'use strict';

var React    = require('react');
window.React = React; // React Dev Tools requires this
var routes   = require('./routes');

React.initializeTouchEvents(true);

React.renderComponent(routes, window.document.body);
