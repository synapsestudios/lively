/** @jsx React.DOM */
/* global window */
'use strict';

var _                 = require('underscore');
var React             = require('react');
var Fluxxor           = require("fluxxor");
var FluxMixin         = Fluxxor.FluxMixin(React);
var dispatcher        = require('synapse-common/lib/dispatcher');
var OAuthStore        = require('../../store/oauth2');
var OAuthConnectPanel = require('../components/oauth');
var MainNav           = require('../components/main-nav');
var ResourcePage      = require('../components/resource');
var NotFoundPage      = require('./404');
var store             = require('store');

module.exports = React.createClass({
    mixins: [FluxMixin],

    displayName : 'ApiPage',

    propTypes : {
        config : React.PropTypes.object.isRequired
    },

    componentWillMount : function()
    {
        var options = store.get(this.props.params.apiSlug + '-client');

        this.config = this.props.config.apis[this.props.params.apiSlug];
        if (_.isUndefined(this.config)) {
            return;
        }
        this.getFlux().stores.oauth2 = new OAuthStore({namespace: this.props.params.apiSlug});

        if (this.props.query && this.props.query.access_token && options) {

            this.getFlux().actions.oauth2.setOptions({
                clientId     : options.clientId,
                clientSecret : options.clientSecret,
                api          : this.config.api,
                oauth2       : this.config.oauth2
            });

            this.getFlux().actions.oauth2.setToken({
                accessToken : this.props.query.access_token,
                tokenType   : this.props.query.token_type,
                rawData     : this.props.query
            });
        } else {
            this.getFlux().actions.oauth2.setOptions({
                api          : this.config.api,
                oauth2       : this.config.oauth2
            });
        }
    },

    componentDidMount : function()
    {
        if (_.isUndefined(this.config)) {
            this.props.updateHeader();
            return;
        }

        var title = [this.config.name, 'Lively Docs'];
        window.document.title = title.join(' | ');

        this.props.updateHeader(this.config.name, this.config.logo, this.props.params.apiSlug);
    },

    render : function()
    {
        if (_.isUndefined(this.config)) {
            return (<NotFoundPage />);
        }
        else {
            return (
                <div>
                    <OAuthConnectPanel config={this.props.config} slug={this.props.params.apiSlug} />
                    <MainNav
                        config={this.config}
                        logo={this.config.logo}
                        name={this.config.name}
                        stores={{oauth : this.oauthStore}}
                        slug={this.props.params.apiSlug}
                    />
                    <this.props.activeRouteHandler
                        config={this.props.config.apis[this.props.params.apiSlug]}
                        stores={{oauth : this.oauthStore}}
                    />
                </div>
            );
        }
    }

});
