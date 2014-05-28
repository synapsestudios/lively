/** @jsx React.DOM */
/* global window */
'use strict';

var React             = require('react');
var StoreWatchMixin   = require('synapse-common/ui/mixins/store-watch');
var Resource          = require('../components/resource');
var OAuthConnectPanel = require('../components/oauth');
var store             = require('store');
var qs                = require('querystring');
var url               = require('url');
var MainNav           = require('../components/navigation/main-nav');


module.exports = React.createClass({

    displayName : 'HomeModule',

    mixins : [ StoreWatchMixin ],

    propTypes : {
        config : React.PropTypes.object.isRequired
    },

    getStateFromStores : function()
    {
        return {
            hasOAuth : (this.props.stores.oauth.accessToken !== null)
        };
    },

    getInitialState : function()
    {
        return this.getStateFromStores();
    },

    componentWillMount : function()
    {
        var options = store.get(this.props.slug + '-client');
        var config  = this.props.config;

        if (window.location.search.length > 1 && options) {

            this.props.stores.oauth.setOptions({
                clientId     : options.clientId,
                clientSecret : options.clientSecret,
                api          : config.api,
                oauth2       : config.oauth2
            });

            var queryString = qs.parse(window.location.search.substring(1));

            this.props.stores.oauth.setToken({
                accessToken : queryString.access_token,
                tokenType   : queryString.token_type,
                rawData     : queryString
            });
        }
    },

    handleOAuthStart : function(options)
    {
        store.set(this.props.slug + '-client', options);

        var config = this.props.config.oauth2;

        var redirectQs = qs.stringify({
            'client_id'     : options.clientId,
            'client_secret' : options.clientSecret,
            'api'           : this.props.slug
        });

        var redirectUrl = url.format({
            protocol : config.secure ? 'https' : 'http',
            hostname : config.hostname,
            port     : config.port,
            pathname : config.authorizeUrl,
            query    : {
                'client_id'     : options.clientId,
                'client_secret' : options.clientSecret,
                'response_type' : 'code',
                'redirect_uri'  : 'http://127.0.0.1:9001/oauth2-redirect?' + redirectQs,
                'scope'         : options.scope,
                'state'         : Math.random()
            }
        });

        window.location = redirectUrl;
    },

    render : function()
    {
        var self = this;

        var resources = this.props.config.resources.map(function(resource, idx) {
            return (
                <Resource key={idx}
                          name={resource.name}
                          methods={resource.methods}
                          oauthStore={self.props.stores.oauth} />
            );
        });

        var stores = {
            oauth : this.props.stores.oauth
        };

        return (
            <div>
                <MainNav />
                <div className="panel__wrapper">
                    <OAuthConnectPanel stores={stores} onOAuthStart={this.handleOAuthStart} />
                    {resources}
                </div>
            </div>
        );
    }

});
