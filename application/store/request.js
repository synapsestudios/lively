'use strict';

var _            = require('underscore');
var constants    = require('../constants');
var Fluxxor      = require('fluxxor');
var config       = require('../config');

module.exports = Fluxxor.createStore({

    initialize : function(options)
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
            constants.SET_NULL_VALUE, 'onSetNullValue',
            constants.UNSET_NULL_VALUE, 'onUnsetNullValue',
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
        this.state.endpoint[requestInfo.endpointName].response = null;
        this.state.requestInfo = requestInfo.requestInfo;
        this.state.endpointName = requestInfo.endpointName;

        this.emit('change');
    },

    onRequestSuccess : function(payload)
    {
        var response, endpointName;

        response     = payload.response;
        endpointName = payload.endpointName;

        if (! this.state.endpoint[endpointName]) {
            this.state.endpoint[endpointName] = this.getBlankEndpointDataObject();
        }

        this.state.endpoint[endpointName].response = response;
        this.state.endpoint[endpointName].responseTimestamp = Date.now();

        this.emit('change');
    },

    onRequestFailure : function(endpointName)
    {
        this.state.endpoint[endpointName].response = false;

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

    onAddToExcludedFields : function(payload)
    {
        var endpointName, field;

        endpointName = payload.endpointName;
        field        = payload.field;

        if (! this.state.endpoint[endpointName]) {
            this.state.endpoint[endpointName] = this.getBlankEndpointDataObject();
        }

        this.state.endpoint[endpointName].excludedFields.push(field);

        this.emit('change');
    },

    onRemoveFromExcludedFields : function(payload)
    {
        var endpointName, field;

        endpointName = payload.endpointName;
        field        = payload.field;

        if (! this.state.endpoint[endpointName]) {
            this.state.endpoint[endpointName] = this.getBlankEndpointDataObject();
        }

        this.state.endpoint[endpointName].excludedFields = _(this.state.endpoint[endpointName].excludedFields).without(field);

        this.emit('change');
    },

    onSetNullValue : function(payload)
    {
        var endpointName, field;

        endpointName = payload.endpointName;
        field        = payload.field;

        if (! this.state.endpoint[endpointName]) {
            this.state.endpoint[endpointName] = this.getBlankEndpointDataObject();
        }

        this.state.endpoint[endpointName].nullFields.push(field);

        this.emit('change');
    },

    onUnsetNullValue : function(payload)
    {
        var endpointName, field;

        endpointName = payload.endpointName;
        field        = payload.field;

        if (! this.state.endpoint[endpointName]) {
            this.state.endpoint[endpointName] = this.getBlankEndpointDataObject();
        }

        this.state.endpoint[endpointName].nullFields = _(this.state.endpoint[endpointName].nullFields).without(field);

        this.emit('change');
    },

    getBlankEndpointDataObject : function()
    {
        return {
            values         : [],
            excludedFields : [],
            nullFields     : []
        };
    }

});
