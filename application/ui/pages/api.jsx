/** @jsx React.DOM */
/* global window */
'use strict';

var _                 = require('underscore');
var React             = require('react');
var Fluxxor           = require('fluxxor');
var FluxMixin         = Fluxxor.FluxMixin(React);
var dispatcher        = require('synapse-common/lib/dispatcher');
var OAuthStore        = require('../../store/oauth2');
var OAuthConnectPanel = require('../components/oauth');
var MainNav           = require('../components/main-nav');
var ResourcePage      = require('../components/resource');
var NotFoundPage      = require('./404');

module.exports = React.createClass({
    mixins : [FluxMixin],

    displayName : 'ApiPage',

    propTypes : {
        config : React.PropTypes.object.isRequired
    },

    componentWillMount : function()
    {
        this.apiConfig = this.props.config.apis[this.props.params.apiSlug];
        if (_.isUndefined(this.apiConfig)) {
            return;
        }
        this.getFlux().stores.oauth2 = new OAuthStore({
            namespace : this.props.params.apiSlug,
            api       : this.apiConfig.api,
            oauth2    : this.apiConfig.oauth2
        });

        if (this.props.query && this.props.query.access_token) {
            this.getFlux().actions.oauth2.setToken({
                accessToken : this.props.query.access_token,
                tokenType   : this.props.query.token_type,
                tokenData   : this.props.query
            });
        }
    },

    componentDidMount : function()
    {
        if (_.isUndefined(this.apiConfig)) {
            this.props.updateHeader();
            return;
        }

        var title = [this.apiConfig.name, 'Lively Docs'];
        window.document.title = title.join(' | ');

        this.props.updateHeader(this.apiConfig.name, this.apiConfig.logo, this.props.params.apiSlug);
    },

    render : function()
    {
        if (_.isUndefined(this.apiConfig)) {
            return (<NotFoundPage />);
        }
        else {
            return (
                <div>
                    <OAuthConnectPanel
                        config={this.props.config}
                        slug={this.props.params.apiSlug}
                    />
                    <MainNav
                        apiConfig={this.apiConfig}
                        slug={this.props.params.apiSlug}
                    />
                    <this.props.activeRouteHandler apiConfig={this.apiConfig} />
                </div>
            );
        }
    }

});
