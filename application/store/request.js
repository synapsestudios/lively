'use strict';

var _            = require('underscore');
var constants    = require('../constants');
var Fluxxor      = require('fluxxor');
var config       = require('../config');

module.exports = Fluxxor.createStore({

    initialize : function(options)
    {
        this.state = {
            excludedFields : {},
            values         : {}
        };

        this.bindActions(
            constants.SET_API, 'onSetApi',
            constants.REQUEST, 'onRequest',
            constants.REQUEST_SUCCESS, 'onRequestSuccess',
            constants.REQUEST_FAILURE, 'onRequestFailure',
            constants.SET_REQUEST_VALUES, 'onSetRequestValues',
            constants.REQUEST_ADD_TO_EXCLUDED_FIELDS, 'onAddToExcludedFields',
            constants.REQUEST_REMOVE_FROM_EXCLUDED_FIELDS, 'onRemoveFromExcludedFields'
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
        this.state.requestInfo            = requestInfo.requestInfo;
        this.state.requestInfo.endpointId = requestInfo.endpointId;

        this.emit('change');
    },

    onRequestSuccess : function(response)
    {
        this.state.response = response;
        this.state.responseTimestamp = Date.now();

        this.emit('change');
    },

    onRequestFailure : function()
    {
        this.state.response = false;

        this.emit('change');
    },

    onSetRequestValues : function(payload)
    {
        var endpointName, values;

        endpointName = payload.endpointName;
        values       = payload.values;

        if (! this.state.values[endpointName]) {
            this.state.values[endpointName] = {};
        }

        this.state.values[endpointName] = values;

        this.emit('change');
    },

    onAddToExcludedFields : function(payload)
    {
        var endpointName, field;

        endpointName = payload.endpointName;
        field        = payload.field;

        if (! this.state.excludedFields[endpointName]) {
            this.state.excludedFields[endpointName] = [];
        }

        this.state.excludedFields[endpointName].push(field);

        this.emit('change');
    },

    onRemoveFromExcludedFields : function(payload)
    {
        var endpointName, field;

        endpointName = payload.endpointName;
        field        = payload.field;

        if (! this.state.excludedFields[endpointName]) {
            this.state.excludedFields[endpointName] = [];
        }

        this.state.excludedFields[endpointName] = _(this.state.excludedFields[endpointName]).without(field);

        this.emit('change');
    }

});
