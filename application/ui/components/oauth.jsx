/* global window */
'use strict';

var _              = require('underscore');
var React          = require('react');
var Fluxxor        = require('fluxxor');
var FluxChildMixin = Fluxxor.FluxMixin(React);
var cx             = require('react/lib/cx');
var TextInput      = require('./input/text');
var Events         = require('../mixins/events');
var util           = require('util');
var qs             = require('querystring');
var url            = require('url');
var config         = require('../../config');
var store = require('store');

var Base64 = {


    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },


    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

};

module.exports = React.createClass({

    displayName : 'OAuthPanel',

    mixins : [ Events, FluxChildMixin ],

    propTypes : {
        oauthStoreState : React.PropTypes.object.isRequired,
        apiConfig       : React.PropTypes.object.isRequired
    },

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
    handleConnectClick : function()
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
            config.lively.hostname + ':' +
            config.lively.port
        );

        var redirectUri = 'http://' + redirectHost + '/oauth2-redirect?' + redirectQs;
        store.set('redirect_uri', redirectUri);
        var state = Base64.encode(redirectUri);

        window.location = url.format({
            protocol : this.props.apiConfig.oauth2.secure ? 'https' : 'http',
            hostname : this.props.apiConfig.oauth2.hostname,
            port     : this.props.apiConfig.oauth2.port,
            pathname : this.props.apiConfig.oauth2.authorizeUrl,
            query    : {
                'client_id'     : options.clientId,
                'client_secret' : options.clientSecret,
                'response_type' : 'code',
                'redirect_uri'  : redirectUri,
                'scope'         : options.scope,
                'state'         : state
            }
        });
    },

    handleLogoutClick : function()
    {
        this.getFlux().actions.oauth.setToken({});
    },

    getInitialState : function()
    {
        return {
            oAuthPanelHidden : true
        };
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
                        <h1>OAuth2</h1>
                        <a className='panel__header-x' onClick={this.toggleOAuthPanel}></a>
                    </div>
                    <div className='oauth-panel__form'>
                        <div className='small-4 columns'>
                            <label className='panel-form__label' htmlFor='clientId'>Client ID</label>
                            <TextInput
                                className = 'form__input panel-form__input'
                                name      = 'clientId'
                                value     = {this.props.oauthStoreState.clientId}
                                onChange  = {_.partial(this.handleUpdate, 'clientId')}
                            />
                        </div>
                        <div className='small-4 columns'>
                            <label className='panel-form__label' htmlFor='clientSecret'>Client Secret</label>
                            <TextInput
                                className = 'form__input panel-form__input'
                                name      = 'clientSecret'
                                value     = {this.props.oauthStoreState.clientSecret}
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
                            <a className='button right' onClick={this.handleLogoutClick}>Log Out</a>
                            <a className='button right l--m-right-10' onClick={this.handleConnectClick}>Connect</a>
                        </div>
                        <hr />
                        <div className='small-6 columns'>
                            <pre>Access token: {this.props.oauthStoreState.accessToken}</pre>
                        </div>
                        <div className='small-6 columns'>
                            <pre>Token data: {util.inspect(this.props.oauthStoreState.tokenData)}</pre>
                        </div>
                    </div>
                </div>
                <div className={overlayClasses} />
            </div>
        );
    }
});
