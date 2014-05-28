/** @jsx React.DOM */
'use strict';

// Libraries
var _     = require('underscore');
var React = require('react');

// Mixins and components
var Router              = require('react-router-component');
var Locations           = Router.Locations;
var Location            = Router.Location;
var NotFound            = Router.NotFound;

// Pages
var SiteLayoutComponent = require('./layouts/site');
var ApiList             = require('./pages/api-list');
var ApiModule           = require('./pages/api');
var NotFoundPage        = require('./pages/404');
var OAuthStore          = require('../store/oauth2');

module.exports = React.createClass({

    displayName : 'PageRoot',

    render : function()
    {
        var apiLocations = _.map(this.props.configs, function(config, slug) {
            var stores = { oauth : new OAuthStore(slug) };
            return [
                <Location key={slug}
                          path={'/'+slug}
                          handler={ApiModule}
                          config={config}
                          slug={slug}
                          stores={stores} />,
                <Location key={slug+'-callback'}
                          path={'/oauth2/callback/'+slug}
                          handler={ApiModule}
                          config={config} />
            ];
        });

        var list = _.map(this.props.configs, function(config, slug) {
            return { name : config.name, slug : slug};
        });

        apiLocations = _.flatten(apiLocations);
        apiLocations.unshift(<Location path="/" handler={ApiList} list={list} />);
        apiLocations.push(<NotFound handler={NotFoundPage} />);

        return (
            <SiteLayoutComponent>
                <Locations ref="router">
                    {apiLocations}
                </Locations>
            </SiteLayoutComponent>
        );
    }

});
