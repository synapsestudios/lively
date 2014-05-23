/* global document */
'use strict';

var React      = require('react');
var dispatcher = require('synapse-common/lib/dispatcher');
var Main       = require('./ui/main');

function Application() {
    this.dispatcher = dispatcher;

    this.start = function() {
        React.initializeTouchEvents(true);

        this.react = React.renderComponent(Main({}), document.body);
    };
}

module.exports = Application;
