/* global window */
'use strict';

var React        = require('react');
window.React     = React; // react-router requires this

var dispatcher   = require('synapse-common/lib/dispatcher');

var Router  = require('react-router');
var Route   = Router.Route;

var SiteLayout   = require('./ui/layouts/site');
var ApiList      = require('./ui/pages/api-list');
var ApiPage      = require('./ui/pages/api');

var URLStore     = require('react-router/modules/stores/URLStore');

var Application = function(config) {
    this.dispatcher = dispatcher;
    this.config     = config;
};

Application.prototype.start = function() {
    React.initializeTouchEvents(true);

    var router = (
        <Route handler={SiteLayout} location='history'>
            <Route name='api-list'           path='/'                         handler={ApiList} config={this.config} />
            <Route name='api-oauth-callback' path='/oauth2/callback/:apiSlug' handler={ApiPage} config={this.config} />
            <Route name='api'                path='/:apiSlug'                 handler={ApiPage} config={this.config} />
            <Route name='api-resource'       path='/:apiSlug/:resourceSlug'   handler={ApiPage} config={this.config} />
        </Route>
    );

    URLStore.addChangeListener(function() {
        window.scrollTo(0,0);
    });

    dispatcher.on('router:redirect', function(route, params) {
        Router.transitionTo(route, params || {});
    }.bind(this));

    React.renderComponent(router, window.document.body);
};

module.exports = Application;
