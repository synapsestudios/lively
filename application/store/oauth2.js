'use strict';

var _            = require('underscore');
var localStorage = require('store');
var constants    = require('../constants');
var Fluxxor      = require('fluxxor');

module.exports = Fluxxor.createStore({

    initialize : function(options)
    {
        this.state = {};

        this.bindActions(
            constants.SET_API, 'onSetApi',
            constants.SET_TOKEN, 'onSetToken',
            constants.OAUTH_SET_CLIENT_OPTIONS, 'onSetClientOptions'
        );
    },

    getState: function()
    {
        return _.extend({}, this.state);
    },

    onSetApi : function(apiSlug)
    {
        this.state.namespace = apiSlug;

        if (localStorage.get(apiSlug + 'oauth')) {
            this.unserializeFromLocalStorage();
        } else {
            delete this.state.accessToken;
            delete this.state.refreshToken;
            delete this.state.tokenType;
            delete this.state.tokenData;
        }

        this.emit('change');
    },

    onSetToken : function(tokenData)
    {
        this.state.accessToken  = tokenData.accessToken;
        this.state.refreshToken = tokenData.refreshToken;
        this.state.tokenType    = tokenData.tokenType;
        this.state.tokenData    = tokenData.tokenData;

        this.serializeToLocalStorage();

        this.emit('change');
    },

    onSetClientOptions : function(options)
    {
        this.state.clientId     = options.clientId;
        this.state.clientSecret = options.clientSecret;

        this.emit('change');
    },

    serializeToLocalStorage : function()
    {
        localStorage.set(this.state.namespace + 'oauth', {
            access_token  : this.state.accessToken,
            refresh_token : this.state.refreshToken,
            token_type    : this.state.tokenType,
            token_data    : this.state.tokenData
        });
    },

    unserializeFromLocalStorage : function()
    {
        var data = localStorage.get(this.state.namespace + 'oauth');

        this.state.accessToken  = data.access_token;
        this.state.refreshToken = data.refresh_token;
        this.state.tokenType    = data.token_type;
        this.state.tokenData    = data.token_data;
    }
});
