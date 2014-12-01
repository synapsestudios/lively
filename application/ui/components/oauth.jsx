/** @jsx React.DOM */
/* global window */
'use strict';

var _              = require('underscore');
var React          = require('react');
var Fluxxor        = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxMixin(React);
var cx             = require('react/lib/cx');
var TextInput      = require('./input/text');
var Events         = require('synapse-common/ui/mixins/events');
var util           = require('util');
var qs             = require('querystring');
var url            = require('url');

module.exports = React.createClass({

    displayName : 'OAuthPanel',

    mixins : [ Events, FluxChildMixin ],

    componentWillMount : function()
    {
        this.subscribe('toggleOauthPanel', function() {
            this.setState({
                oAuthPanelHidden : ! this.state.oAuthPanelHidden
            });
        }.bind(this));
    },

    /**
     * Forward browser to the OAuth2 server in the API config, which will redirect the user back
     * with an authorization code for it to use to request the access token
     */
    handleClick : function()
    {
        var options = {
            clientId     : this.state.clientId,
            clientSecret : this.state.clientSecret,
            scope        : this.state.scope
        };

        var redirectQs = qs.stringify({
            'client_id'     : options.clientId,
            'client_secret' : options.clientSecret,
            'api'           : this.props.slug
        });

        var redirectHost = (
            this.props.config.lively.hostname + ':' +
            this.props.config.lively.port
        );

        var redirectUrl = url.format({
            protocol : this.props.config.apis[this.props.slug].oauth2.secure ? 'https' : 'http',
            hostname : this.props.config.apis[this.props.slug].oauth2.hostname,
            port     : this.props.config.apis[this.props.slug].oauth2.port,
            pathname : this.props.config.apis[this.props.slug].oauth2.authorizeUrl,
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

    getInitialState : function()
    {
        var initialState = {
            hasOAuth         : (this.getFlux().stores.oauth2.accessToken !== null),
            oauthData        : (this.getFlux().stores.oauth2),
            oAuthPanelHidden : true
        };

        if (! initialState.oauthData.tokenData) {
            initialState.clientId     = null;
            initialState.clientSecret = null;
            initialState.scope        = null;
        } else {
            initialState.clientId     = initialState.oauthData.tokenData.client_id;
            initialState.clientSecret = initialState.oauthData.tokenData.client_secret;
            initialState.scope        = initialState.oauthData.tokenData.scope;
        }

        return initialState;
    },

    handleUpdate : function(stateProperty, value)
    {
        var state = this.state;

        state[stateProperty] = value;

        this.setState(state);
    },

    toggleOAuthPanel : function()
    {
        this.setState({
            oAuthPanelHidden : ! this.state.oAuthPanelHidden
        });
    },

    render : function()
    {
        var oAuthPanelClasses = cx({
            'panel'         : true,
            'oauth-panel'   : true,
            'panel--hidden' : this.state.oAuthPanelHidden
        });

        var overlayClasses = cx({
            'overlay-pattern'         : true,
            'overlay-pattern--hidden' : this.state.oAuthPanelHidden
        });

        return (
            <div>
                <div className={oAuthPanelClasses}>
                    <div className='panel__header'>
                        <h1>OAuth2</h1><a className='panel__header-x' onClick={this.toggleOAuthPanel}></a>
                    </div>
                    <div className='oauth-panel__form'>
                        <div className='small-4 columns'>
                            <label className='panel-form__label' htmlFor='clientId'>Client ID</label>
                            <TextInput
                                className = 'form__input panel-form__input'
                                name      = 'clientId'
                                value     = {this.state.clientId}
                                onChange  = {_.partial(this.handleUpdate, 'clientId')}
                            />
                        </div>
                        <div className='small-4 columns'>
                            <label className='panel-form__label' htmlFor='clientSecret'>Client Secret</label>
                            <TextInput
                                className = 'form__input panel-form__input'
                                name      = 'clientSecret'
                                value     = {this.state.clientSecret}
                                onChange  = {_.partial(this.handleUpdate, 'clientSecret')}
                            />
                        </div>
                        <div className='small-4 columns'>
                            <label className='panel-form__label' htmlFor='scope'>Scope</label>
                            <TextInput
                                className = 'form__input panel-form__input'
                                name      = 'scope'
                                value     = {this.state.scope}
                                onChange  = {_.partial(this.handleUpdate, 'scope')}
                            />
                        </div>
                        <div className='small-12 columns'>
                            <a className='button right' onClick={this.handleClick}>Connect</a>
                        </div>
                        <hr />
                        <div className='small-6 columns'>
                            <pre>Access token: {this.state.oauthData.accessToken}</pre>
                        </div>
                        <div className='small-6 columns'>
                            <pre>Token data: {util.inspect(this.state.oauthData.tokenData)}</pre>
                        </div>
                    </div>
                </div>
                <div className={overlayClasses} />
            </div>
        );
    }
});
