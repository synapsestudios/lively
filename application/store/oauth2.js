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
        }

        this.emit('change');
    },

    onSetToken : function(tokenData)
    {
        this.state.accessToken = tokenData.accessToken;
        this.state.tokenType   = tokenData.tokenType;
        this.state.tokenData   = tokenData.tokenData;

        this.serializeToLocalStorage();

        this.emit('change');
    },

    onSetClientOptions : function(options)
    {
        this.clientId     = options.clientId;
        this.clientSecret = options.clientSecret;

        this.emit('change');
    },

    serializeToLocalStorage : function()
    {
        localStorage.set(this.state.namespace + 'oauth', {
            accessToken  : this.state.accessToken,
            tokenType    : this.state.tokenType,
            tokenData    : this.state.tokenData
        });
    },

    unserializeFromLocalStorage : function()
    {
        var data = localStorage.get(this.state.namespace + 'oauth');

        this.state.accessToken = data.accessToken;
        this.state.tokenType   = data.tokenType;
        this.state.tokenData   = data.tokenData;
    }
});
