/** @jsx React.DOM */
'use strict';

// Libraries
var React      = require('react');

// Mixins and components
var Router              = require('react-router-component');
var Locations           = Router.Locations;
var Location            = Router.Location;
var NotFound            = Router.NotFound;

// Pages
var SiteLayoutComponent = require('./layouts/site');
var HomeModule          = require('./pages/home');
var NotFoundPage        = require('./pages/404');
var apiConfig           = require('../config.api');
var OAuthStore          = require('../store/oauth2');

module.exports = React.createClass({

    displayName : 'PageRoot',

    render : function()
    {
        var stores = {
            oauth : new OAuthStore()
        };

        return (
            <SiteLayoutComponent>
                <Locations ref="router">
                    <Location path="/" handler={HomeModule} config={apiConfig} stores={stores} />
                    <Location path="/oauth2/callback" handler={HomeModule} config={apiConfig} />
                    <NotFound handler={NotFoundPage} />
                </Locations>
            </SiteLayoutComponent>
        );
    }

});
