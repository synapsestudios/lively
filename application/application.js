/* global document */
'use strict';

var React      = require('react');
var dispatcher = require('synapse-common/lib/dispatcher');
var Main       = require('./ui/main');

function Application(configs) {
    this.dispatcher = dispatcher;
    this.configs    = configs;

    this.start = function() {
        window.React = React;
        React.initializeTouchEvents(true);

        this.react = React.renderComponent(Main({
            configs : this.configs
        }), document.body);
    };
}

module.exports = Application;
