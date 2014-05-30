/** @jsx React.DOM */
/* global window */
'use strict';

var _                 = require('underscore');
var React             = require('react');
var StoreWatchMixin   = require('synapse-common/ui/mixins/store-watch');
var OAuthConnectPanel = require('../components/oauth');
var MainNav           = require('../components/navigation/main-nav');
var ResourcePage      = require('./resource');
var store             = require('store');
var qs                = require('querystring');
var url               = require('url');

var Router    = require('react-router-component');
var Locations = Router.Locations;
var Location  = Router.Location;
var NotFound  = Router.NotFound;

module.exports = React.createClass({

    displayName : 'ApiPage',

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

    slugify : function(text)
    {
        return text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    },

    mapFlatResourceLocations : function(resource, idx)
    {
        return (
            <Location key={idx}
                      handler={ResourcePage}
                      path={'/'+this.slugify(resource.name)}
                      config={resource}
                      stores={this.props.stores} />
        );
    },

    mapNestedResourceLocations : function(data)
    {
        return _.map(data, this.mapFlatResourceLocations, this);
    },

    mapFlatNavLocations : function(resource, idx)
    {
        return <Location
            handler={MainNav}
            config={this.props.config}
            path={'/'+this.slugify(resource.name)}
            active={this.slugify(resource.name)}
            logo={this.props.config.logo}
            name={this.props.config.name}
            slug={this.props.slug} />;
    },

    mapNestedNavLocations : function(data)
    {
        return _.map(data, this.mapFlatNavLocations, this);
    },

    render : function()
    {
        var navLocations, resourceLocations;

        if (_.isArray(this.props.config.resources)) {
            resourceLocations = _.map(this.props.config.resources, this.mapFlatResourceLocations, this);
            navLocations      = _.map(this.props.config.resources, this.mapFlatNavLocations, this);
        } else {
            resourceLocations = _.flatten(_.map(this.props.config.resources, this.mapNestedResourceLocations, this));
            navLocations      = _.flatten(_.map(this.props.config.resources, this.mapNestedNavLocations, this));
        }


        resourceLocations.push(<NotFound handler={React.DOM.div} />);
        navLocations.push(<NotFound
            handler={MainNav}
            config={this.props.config}
            active={false}
            logo={this.props.config.logo}
            name={this.props.config.name}
            slug={this.props.slug} />);

        return (
            <div>
                <Locations contextual>
                    {navLocations}
                </Locations>
                <div className="panel__wrapper">
                    <OAuthConnectPanel stores={this.props.stores} onOAuthStart={this.handleOAuthStart} />
                    <Locations contextual>
                        {resourceLocations}
                    </Locations>
                </div>
            </div>
        );
    }

});
