/* global window */
'use strict';

var React        = require('react');
var dispatcher   = require('synapse-common/lib/dispatcher');

var ReactRouter  = require('react-nested-router');
var Route        = ReactRouter.Route;

var SiteLayout   = require('./ui/layouts/site');
var ApiList      = require('./ui/pages/api-list');
var ApiPage      = require('./ui/pages/api');

var URLStore     = require('react-nested-router/modules/stores/URLStore');

function Application(config) {
    this.dispatcher = dispatcher;
    this.config     = config;

    this.start = function() {
        window.React = React;
        React.initializeTouchEvents(true);

        var router = (
            <Route handler={SiteLayout} location='history'>
                <Route name='api-list'
                       path='/'
                       handler={ApiList}
                       config={this.config} />
                <Route name='api-oauth-callback'
                       path='/oauth2/callback/:apiSlug'
                       handler={ApiPage}
                       config={this.config} />
                <Route name='api'
                       path='/:apiSlug'
                       handler={ApiPage}
                       config={this.config} />
               <Route name='api-resource'
                       path='/:apiSlug/:resourceSlug'
                       handler={ApiPage}
                       config={this.config} />
            </Route>
        );

        URLStore.addChangeListener(function() {
            window.scrollTo(0,0);
        });

        dispatcher.on('router:redirect', function(route, params) {
            ReactRouter.transitionTo(route, params || {});
        }.bind(this));

        React.renderComponent(router, window.document.body);
    };
}

module.exports = Application;
