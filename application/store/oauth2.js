'use strict';

var _            = require('underscore');
var localStorage = require('store');
var constants    = require('../constants');
var Fluxxor      = require('fluxxor');
var config       = require('../config');

module.exports = Fluxxor.createStore({

    initialize : function(options)
    {
        this.state = {
            loaded : false,
            error  : false
        };

        this.bindActions(
            constants.SET_API, 'setApi',
            constants.SET_TOKEN, 'setToken',
            constants.OAUTH2_REQUEST, 'onRequest',
            constants.OAUTH2_REQUEST_SUCCESS, 'onRequestSuccess',
            constants.OAUTH2_REQUEST_FAILURE, 'onRequestFailure',
            constants.OAUTH2_SET_CLIENT_OPTIONS, 'onSetClientOptions',
            constants.OAUTH2_SET_TOKEN, 'onSetToken'
        );
    },

    getState: function()
    {
        return _.extend({}, this.state);
    },

    setApi : function(apiSlug)
    {
        var apiConfig = config.apis[apiSlug];

        this.state.namespace = apiSlug;
        this.state.api       = apiConfig.api;
        this.state.oauth2    = apiConfig.oauth2;

        if (localStorage.get(this.namespace + 'oauth')) {
            this.unserializeFromLocalStorage();
        }

        this.emit('change');
    },

    setToken : function(tokenData)
    {
        this.state.accessToken = tokenData.accessToken;
        this.state.tokenType   = tokenData.tokenType;
        this.state.tokenData   = tokenData.tokenData;

        this.serializeToLocalStorage();

        this.emit('change');
    },

    onRequest : function()
    {
        this.state.loaded = false;
        this.state.error  = false;

        this.emit('change');
    },

    onRequestSuccess : function(data)
    {
        this.state.loaded = true;

        this.emit('change');
    },

    onRequestFailure : function()
    {
        this.state.error = true;

        this.emit('change');
    },

    onSetToken : function(data)
    {
        this.setToken(data);
    },

    serializeToLocalStorage : function()
    {
        localStorage.set(this.namespace + 'oauth', {
            hostname     : this.state.hostname,
            port         : this.state.port,
            secure       : this.state.secure,
            tokenParam   : this.state.tokenParam,
            accessToken  : this.state.accessToken,
            tokenType    : this.state.tokenType,
            tokenData    : this.state.tokenData
        });
    },

    unserializeFromLocalStorage : function()
    {
        var data = localStorage.get(this.namespace + 'oauth');

        this.state.hostname    = data.hostname;
        this.state.port        = data.port;
        this.state.secure      = data.secure;
        this.state.tokenParam  = data.tokenParam;
        this.state.accessToken = data.accessToken;
        this.state.tokenType   = data.tokenType;
        this.state.tokenData   = data.tokenData;
    },

    getAuthorizationHeader : function()
    {
        return this.tokenParam + ' ' + (this.accessToken);
    }
});
