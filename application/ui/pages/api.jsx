/** @jsx React.DOM */
/* global window */
'use strict';

var _                 = require('underscore');
var React             = require('react');
var OAuthStore        = require('../../store/oauth2');
var SiteHeader        = require('../layouts/header');
var OAuthConnectPanel = require('../components/oauth');
var MainNav           = require('../components/navigation/main-nav');
var ResourcePage      = require('./resource');
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
        var options = store.get(this.props.params.apiSlug + '-client');
        var config  = this.props.config.apis[this.props.params.apiSlug];

        this.config     = config;
        this.oauthStore = new OAuthStore(this.props.params.apiSlug);

        if (window.location.search.length > 1 && options) {

            this.oauthStore.setOptions({
                clientId     : options.clientId,
                clientSecret : options.clientSecret,
                api          : config.api,
                oauth2       : config.oauth2
            });

            var queryString = qs.parse(window.location.search.substring(1));

            this.oauthStore.setToken({
                accessToken : queryString.access_token,
                tokenType   : queryString.token_type,
                rawData     : queryString
            });
        } else {
            this.oauthStore.setOptions({
                api          : config.api,
                oauth2       : config.oauth2
            });
        }
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

        var redirectHost = window.location.hostname + ':' + window.location.port;

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

    slugify : function(text)
    {
        return text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    },

    findResource : function(resource)
    {
        if (this.slugify(resource.name) === this.props.params.resourceSlug) {
            return true;
        }
    },

    getFlatResources : function(categories)
    {
        var resources = [];

        _.each(categories, function(category) {
            resources = resources.concat(category);
        });

        return resources;
    },

    render : function()
    {
        var nav, resource, resourcePage,
            stores = { oauth : this.oauthStore };

        if (_.isArray(this.config.resources)) {
            resource = _.find(this.config.resources, this.findResource, this);
        } else {
            resource = _.find(this.getFlatResources(this.config.resources), this.findResource, this);
        }

        nav = <MainNav
            config={this.config}
            active={resource ? this.slugify(resource.name) : null}
            logo={this.config.logo}
            name={this.config.name}
            slug={this.props.params.apiSlug} />;

        if (resource) {
            resourcePage = <ResourcePage config={resource}
                stores={{oauth : this.oauthStore}} />;
        }

        return (
            <div>
                <SiteHeader stores={stores} slug={this.props.params.apiSlug} name={this.config.name}>
                    <OAuthConnectPanel stores={stores} onOAuthStart={this.handleOAuthStart} />
                </SiteHeader>
                {nav}
                <div className="panel__wrapper">
                    {resourcePage}
                </div>
            </div>
        );
    }

});
