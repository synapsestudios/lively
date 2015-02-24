/* global window */
'use strict';

var React    = require('react');
window.React = React; // React Dev Tools requires this
var routes   = require('./routes');
var Router   = require('react-router');
var flux     = require('./flux');

require('./ui/scss/app');

React.initializeTouchEvents(true);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.withContext({flux : flux}, function () {
        React.render(React.createElement(Handler, null), window.document.body);
    });
});
