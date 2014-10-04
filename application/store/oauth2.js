/* global console */
'use strict';

var _         = require('underscore');
var store     = require('store');
var http      = require('http');
var https     = require('https');
var url       = require('url');
var constants = require('../constants');
var actions   = require('../actions');
var Fluxxor   = require('fluxxor');

module.exports = Fluxxor.createStore({

    initialize : function(options)
    {
        this.namespace    = null;
        this.clientId     = null;
        this.clientSecret = null;
        this.hostname     = null;
        this.port         = 80;
        this.secure       = false;
        this.tokenParam   = 'Bearer';
        this.accessToken  = null;
        this.tokenType    = null;
        this.rawData      = null;
        this.loaded       = false;
        this.error        = false;

        this.namespace = options.namespace + '-';
        if (store.get(this.namespace + 'oauth')) {
            this.unserializeFromLocalStorage();
        }

        this.on('change', function() {
            this.serializeToLocalStorage();
        });

        this.bindActions(
            constants.OAUTH2_REQUEST, 'onRequest',
            constants.OAUTH2_REQUEST_SUCCESS, 'onRequestSuccess',
            constants.OAUTH2_REQUEST_FAILURE, 'onRequestFailure',
            constants.OAUTH2_SET_OPTIONS, 'onSetOptions',
            constants.OAUTH2_SET_TOKEN, 'onSetToken'
        );
    },

    onRequest : function()
    {
        this.loaded  = false;
        this.rawData = null;
        this.error   = false;

        this.emit('change');
    },

    onRequestSuccess : function(data)
    {
        this.loaded  = true;
        this.rawData = data;

        this.emit('change');
    },

    onRequestFailure : function()
    {
        this.error = true;

        this.emit('change');
    },

    onSetOptions : function(data)
    {
        this.clientId     = data.clientId;
        this.clientSecret = data.clientSecret;
        this.hostname     = data.api.hostname;
        this.port         = data.api.port;
        this.secure       = data.api.secure;
        this.tokenParam   = data.oauth2.tokenParam;

        this.emit('change');
    },

    onSetToken : function(data)
    {
        this.accessToken = data.accessToken;
        this.tokenType   = data.tokenType;
        this.rawData     = data.rawData;

        this.emit('change');
    },

    serializeToLocalStorage : function()
    {
        store.set(this.namespace + 'oauth', {
            clientId     : this.clientId,
            clientSecret : this.clientSecret,
            hostname     : this.hostname,
            port         : this.port,
            secure       : this.secure,
            tokenParam   : this.tokenParam,
            accessToken  : this.accessToken,
            tokenType    : this.tokenType,
            rawData      : this.rawData
        });
    },

    unserializeFromLocalStorage : function()
    {
        var data = store.get(this.namespace + 'oauth');

        this.clientId     = data.clientId;
        this.clientSecret = data.clientSecret;
        this.hostname     = data.hostname;
        this.port         = data.port;
        this.secure       = data.secure;
        this.tokenParam   = data.tokenParam;
        this.accessToken  = data.accessToken;
        this.tokenType    = data.tokenType;
        this.rawData      = data.rawData;
    },

    getAuthorizationHeader : function()
    {
        return this.tokenParam + ' ' + (this.accessToken);
    },
});
