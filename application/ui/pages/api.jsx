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

module.exports = React.createClass({

    mixins : [FluxMixin, new StoreWatchMixin('OAuthStore')],

    displayName : 'ApiPage',

    componentDidMount : function()
    {
        this.getFlux().actions.oauth.setApi(this.props.params.apiSlug);

        if (this.props.query && this.props.query.access_token) {
            this.getFlux().actions.oauth.setToken({
                accessToken : this.props.query.access_token,
                tokenType   : this.props.query.token_type,
                tokenData   : this.props.query
            });
        }

        if (_.isUndefined(this.apiConfig)) {
            this.props.updateHeader();
            return;
        }

        var title = [this.apiConfig.name, 'Lively Docs'];
        window.document.title = title.join(' | ');

        this.props.updateHeader(this.apiConfig.name, this.apiConfig.logo, this.props.params.apiSlug);
    },

    getStateFromFlux : function()
    {
        return {
            oauthStoreState : this.getFlux().store('OAuthStore').getState()
        };
    },

    render : function()
    {
        var apiConfig, ActiveRouteHandler;

        apiConfig = config.apis[this.props.params.apiSlug];

        if (_.isUndefined(apiConfig)) {
            return (<NotFoundPage />);
        }

        ActiveRouteHandler = this.props.activeRouteHandler;

        return (
            <div>
                <OAuthConnectPanel
                    apiConfig       = {apiConfig}
                    oauthStoreState = {this.state.oauthStoreState}
                    slug            = {this.props.params.apiSlug}
                />
                <MainNav
                    apiConfig       = {apiConfig}
                    oauthStoreState = {this.state.oauthStoreState}
                    slug            = {this.props.params.apiSlug}
                />
                <ActiveRouteHandler
                    apiConfig       = {apiConfig}
                    oauthStoreState = {this.state.oauthStoreState}
                />
            </div>
        );
    }

});
