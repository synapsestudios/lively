/** @jsx React.DOM */
/* global window */
'use strict';

var _                 = require('underscore');
var React             = require('react');
var OAuthStore        = require('../../store/oauth2');
var OAuthConnectPanel = require('../components/oauth');
var MainNav           = require('../components/main-nav');
var ResourcePage      = require('../components/resource');
var store             = require('store');
var qs                = require('querystring');
var url               = require('url');

module.exports = React.createClass({

    displayName : 'ApiPage',

    propTypes : {
        config : React.PropTypes.object.isRequired
    },

    componentWillMount : function()
    {
        var options         = store.get(this.props.params.apiSlug + '-client');
        var config          = this.props.config.apis[this.props.params.apiSlug];

        this.config     = config;
        this.oauthStore = new OAuthStore(this.props.params.apiSlug);

        if (this.props.query && this.props.query.access_token && options) {

            this.oauthStore.setOptions({
                clientId     : options.clientId,
                clientSecret : options.clientSecret,
                api          : config.api,
                oauth2       : config.oauth2
            });

            this.oauthStore.setToken({
                accessToken : this.props.query.access_token,
                tokenType   : this.props.query.token_type,
                rawData     : this.props.query
            });
        } else {
            this.oauthStore.setOptions({
                api          : config.api,
                oauth2       : config.oauth2
            });
        }
    },

    componentDidMount : function()
    {
        var title = [this.config.name, 'Lively Docs'];
        window.document.title = title.join(' | ');

        this.props.updateHeader(this.config.name, this.config.logo, this.props.params.apiSlug);
    },

    handleOAuthStart : function(options)
    {
        store.set(this.props.params.apiSlug + '-client', options);

        var config = this.config.oauth2;

        var redirectQs = qs.stringify({
            'client_id'     : options.clientId,
            'client_secret' : options.clientSecret,
            'api'           : this.props.params.apiSlug
        });

        var redirectHost = this.props.config.lively.hostname + ':' + this.props.config.lively.port;

        var redirectUrl = url.format({
            protocol : config.secure ? 'https' : 'http',
            hostname : config.hostname,
            port     : config.port,
            pathname : config.authorizeUrl,
            query    : {
                'client_id'     : options.clientId,
                'client_secret' : options.clientSecret,
                'response_type' : 'code',
                'redirect_uri'  : 'http://' + redirectHost + '/oauth2-redirect?' + redirectQs,
                'scope'         : options.scope,
                'state'         : Math.random()
            }
        });

        window.location = redirectUrl;
    },

    render : function()
    {
        var showBackButton = (_.size(this.props.config.apis) !== 1),
            stores         = { oauth : this.oauthStore };

        return (
            <div>
                <MainNav
                    config={this.config}
                    logo={this.config.logo}
                    name={this.config.name}
                    stores={{oauth : this.oauthStore}}
                    slug={this.props.params.apiSlug} />
                <this.props.activeRouteHandler
                    config={this.props.config.apis[this.props.params.apiSlug]}
                    stores={{oauth : this.oauthStore}} />
            </div>
        );
    }

});
