'use strict';

var _            = require('underscore');
var constants    = require('../constants');
var Fluxxor      = require('fluxxor');
var config       = require('../config');

module.exports = Fluxxor.createStore({

    initialize : function(options)
    {
        this.state = {};

        this.bindActions(
            constants.SET_API, 'onSetApi',
            constants.REQUEST, 'onRequest',
            constants.REQUEST_SUCCESS, 'onRequestSuccess',
            constants.REQUEST_FAILURE, 'onRequestFailure',
            constants.SET_REQUEST_BODY, 'onSetRequestBody'
        );
    },

    getState: function()
    {
        return _.extend({}, this.state);
    },

    onSetApi : function(apiSlug)
    {
        var apiConfig = config.apis[apiSlug];

        this.state.namespace = apiSlug;
        this.state.api       = apiConfig.api;
        this.state.oauth2    = apiConfig.oauth2;

        this.emit('change');
    },

    onRequest : function(requestInfo)
    {
        this.state.request            = requestInfo.requestInfo;
        this.state.request.endpointId = requestInfo.endpointId;

        this.emit('change');
    },

    onRequestSuccess : function(response)
    {
        this.state.response = response;

        this.emit('change');
    },

    onRequestFailure : function()
    {
        this.state.response = false;

        this.emit('change');
    },

    onSetRequestBody : function(requestBody)
    {
        this.state.requestBody = requestBody;

        this.emit('change');
    }

});
