/** @jsx React.DOM */
/* global window */
'use strict';

var React             = require('react');
var StoreWatchMixin   = require('synapse-common/ui/mixins/store-watch');
var Resource          = require('../components/resource');
var OAuthConnectPanel = require('../components/oauth');
var store             = require('store');
var qs                = require('querystring');

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
        if (window.location.search.length > 1) {
            var options = store.get('client', options),
                config  = this.props.config;

            this.props.stores.oauth.setOptions(
                options.clientId,
                options.clientSecret,
                config.oauth2.hostname,
                config.oauth2.port || 80,
                config.oauth2.authorizeUrl,
                config.oauth2.tokenUrl,
                config.oauth2.tokenParam
            );

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
        store.set('client', options);

        var config = this.props.config.oauth2;

        var redirectQs = qs.stringify({
            'client_id'     : options.clientId,
            'client_secret' : options.clientSecret
        });

        var url = config.baseUrl + config.authorizeUrl + '?' + qs.stringify({
            'client_id'     : options.clientId,
            'client_secret' : options.clientSecret,
            'response_type' : 'code',
            'redirect_uri'  : 'http://127.0.0.1:9001/oauth2-redirect?' + redirectQs,
            'scope'         : options.scope,
            'state'         : Math.random()
        });

        window.location = url;
    },

    getDefaultProps : function()
    {
        return {
            resources : [
                {
                    name : 'Instance Resources',
                    methods : [
                        {
                            name     : 'get',
                            synopsis : 'List instances',
                            method   : 'GET',
                            uri      : '/instances',
                            oauth    : true,
                            params   : []
                        }
                    ]
                },
                {
                    name : 'OAuth Resources',
                    methods : [
                        {
                            name     : 'authorize',
                            synopsis : 'Authorize via OAuth',
                            method   : 'GET',
                            uri      : '/oauth/authorize',
                            oauth    : false,
                            params   : [
                                {
                                    name         : 'username',
                                    required     : true,
                                    defaultValue : '',
                                    type         : 'string',
                                    description  : 'User\'s username'
                                },
                                {
                                    name         : 'password',
                                    required     : true,
                                    defaultValue : '',
                                    type         : 'string',
                                    description  : 'User\'s password'
                                },
                                {
                                    name        : 'aBool',
                                    required    : true,
                                    type        : 'bool',
                                    description : 'some boolean value'
                                },
                                {
                                    name        : 'anEnum',
                                    required    : true,
                                    type        : 'enum',
                                    description : 'a list of possible values',
                                    enumValues  : [
                                        'foo',
                                        'bar',
                                        'baz'
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },

    render : function()
    {
        var self = this;
        var resources = this.props.resources.map(function(resource, idx) {
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
                <OAuthConnectPanel stores={stores} onOAuthStart={this.handleOAuthStart} />
                {resources}
            </div>
        );
    }

});
