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

module.exports = React.createClass({

    displayName : 'PageRoot',

    render : function()
    {
        return (
            <SiteLayoutComponent>
                <Locations ref="router">
                    <Location path="/" handler={HomeModule} />
                    <NotFound handler={NotFoundPage} />
                </Locations>
            </SiteLayoutComponent>
        );
    }

});
