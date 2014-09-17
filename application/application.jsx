/* global window */
'use strict';

var React         = require('react');
window.React      = React; // react-router requires this

var dispatcher    = require('synapse-common/lib/dispatcher');
var Router        = require('react-router');

var Route         = Router.Route;
var Routes        = Router.Routes;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App           = require('./ui/pages/app');
var NotFoundPage  = require('./ui/pages/404');
var ApiListPage   = require('./ui/pages/api-list');
var ApiPage       = require('./ui/pages/api');

var ApiSummary    = require('./ui/components/api-summary');
var ApiResource   = require('./ui/components/api-resource');

var Application = function(config) {
    this.dispatcher = dispatcher;
    this.config     = config;
};

Application.prototype.start = function() {
    React.initializeTouchEvents(true);

    var router = (
        <Routes location='history'>
            <Route name='app' path='/' handler={App} config={this.config}>
                <Route name='api' path=':apiSlug' handler={ApiPage} config={this.config}>
                    <Route name='api-resource' path=':resourceSlug' handler={ApiResource} config={this.config} />
                    <DefaultRoute name='api-summary' handler={ApiSummary} config={this.config} />
                </Route>
                <Route name='api-oauth-callback' path='oauth2/callback/:apiSlug' handler={ApiSummary} config={this.config} />
                <DefaultRoute name="api-list" handler={ApiListPage} config={this.config} />
                <NotFoundRoute name="not-found" handler={NotFoundPage}/>
            </Route>
        </Routes>
    );

    dispatcher.on('router:redirect', function(route, params) {
        Router.transitionTo(route, params || {});
    }.bind(this));

    React.renderComponent(router, window.document.body);
};

module.exports = Application;
