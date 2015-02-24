/* global window */
'use strict';

var _                 = require('underscore');
var React             = require('react');
var Fluxxor           = require('fluxxor');
var FluxMixin         = Fluxxor.FluxMixin(React);
var StoreWatchMixin   = Fluxxor.StoreWatchMixin;
var OAuthConnectPanel = require('../components/oauth');
var MainNav           = require('../components/main-nav');
var NotFoundPage      = require('./404');
var config            = require('../../config');
var Router            = require('react-router');
var RouteHandler      = Router.RouteHandler;

module.exports = React.createClass({

    mixins : [
        FluxMixin,
        new StoreWatchMixin('OAuthStore'),
        Router.State
    ],

    displayName : 'ApiPage',

    componentWillMount : function()
    {
        this.apiConfig = config.apis[this.getParams().apiSlug];
    },

    componentDidMount : function()
    {
        var query = this.getQuery();

        if (query && query.access_token) {
            this.getFlux().actions.oauth.setToken({
                accessToken : query.access_token,
                tokenType   : query.token_type,
                tokenData   : query
            });
        }

        if (_.isUndefined(this.apiConfig)) {
            this.props.updateHeader();
            return;
        }

        var title = [this.apiConfig.name, 'Lively Docs'];
        window.document.title = title.join(' | ');

        this.getFlux().actions.oauth.setApi(this.getParams().apiSlug);

        this.props.updateHeader(this.apiConfig.name, this.apiConfig.logo, this.getParams().apiSlug);
    },

    getStateFromFlux : function()
    {
        return {
            oauthStoreState : this.getFlux().store('OAuthStore').getState()
        };
    },

    render : function()
    {
        if (_.isUndefined(this.apiConfig)) {
            return (<NotFoundPage />);
        }

        return (
            <div>
                <OAuthConnectPanel
                    apiConfig       = {this.apiConfig}
                    oauthStoreState = {this.state.oauthStoreState}
                    slug            = {this.getParams().apiSlug}
                />
                <MainNav
                    apiConfig       = {this.apiConfig}
                    oauthStoreState = {this.state.oauthStoreState}
                    slug            = {this.getParams().apiSlug}
                />
                <RouteHandler
                    apiConfig       = {this.apiConfig}
                    oauthStoreState = {this.state.oauthStoreState}
                />
            </div>
        );
    }

});
