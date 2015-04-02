'use strict';

var _            = require('underscore');
var constants    = require('../constants');
var Fluxxor      = require('fluxxor');
var config       = require('../config');

module.exports = Fluxxor.createStore({

    initialize : function()
    {
        this.state = {
            endpoint : {}
        };

        this.bindActions(
            constants.SET_API, 'onSetApi',
            constants.REQUEST, 'onRequest',
            constants.REQUEST_SUCCESS, 'onRequestSuccess',
            constants.REQUEST_FAILURE, 'onRequestFailure',
            constants.SET_REQUEST_VALUES, 'onSetRequestValues',
            constants.REQUEST_STRIPE_TOKEN_SUCCESS, 'onRequestStripeTokenSuccess'
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
        var endpoint = this.state.endpoint[requestInfo.endpointName];

        if (_.isUndefined(endpoint)) {
            endpoint = this.state.endpoint[requestInfo.endpointName] = {};
        }

        endpoint.response = null;
        endpoint.loading  = true;
        endpoint.loaded   = false;

        this.state.requestInfo = requestInfo.requestInfo;
        this.state.endpointName = requestInfo.endpointName;
        this.state.endpoint[requestInfo.endpointName].requestTimestamp = Date.now();

        this.emit('change');
    },

    onRequestSuccess : function(payload)
    {
        var response, endpoint, endpointName;

        response     = payload.response;
        endpointName = payload.endpointName;

        if (! this.state.endpoint[endpointName]) {
            this.state.endpoint[endpointName] = this.getBlankEndpointDataObject();
        }

        endpoint = this.state.endpoint[endpointName];

        endpoint.response = response;
        endpoint.loading  = false;
        endpoint.loaded   = true;
        endpoint.responseTimestamp = Date.now();

        this.emit('change');
    },

    onRequestFailure : function(endpointName)
    {
        var endpoint = this.state.endpoint[endpointName];

        endpoint.response = false;
        endpoint.loading  = false;
        endpoint.loaded   = true;
        endpoint.responseTimestamp = Date.now();

        this.emit('change');
    },

    onSetRequestValues : function(payload)
    {
        var endpointName, values;

        endpointName = payload.endpointName;
        values       = payload.values;

        if (! this.state.endpoint[endpointName]) {
            this.state.endpoint[endpointName] = this.getBlankEndpointDataObject();
        }

        this.state.endpoint[endpointName].values = values;

        this.emit('change');
    },

    onRequestStripeTokenSuccess : function()
    {
        var store = this;

        this.waitFor(['StripeStore'], function(stripeStore) {
            var stripeStoreState, endpointName, paramName;

            stripeStoreState = stripeStore.getState();
            endpointName = stripeStoreState.currentEndpoint;
            paramName = stripeStoreState.endpoint[endpointName].paramName;

            if (! store.state.endpoint[endpointName]) {
                store.state.endpoint[endpointName] = store.getBlankEndpointDataObject();
            }

            store.state.endpoint[endpointName].values[paramName] = stripeStoreState.endpoint[endpointName].token;

            store.emit('change');
        });
    },

    getBlankEndpointDataObject : function()
    {
        return {
            values              : {},
            requestTimestamp    : 0,
            responseTimestamp   : 0
        };
    }

});
