'use strict';

var constants = require('../constants');
var Client    = require('../client');

module.exports = {

    oauthRequest : function(apiName, endpointName, accessToken, method, path, queryParams, bodyParams, headers, bodyType)
    {
        var client, flux = this;

        if (! accessToken) {
            return this.dispatch(constants.REQUEST_FAILURE);
        }

        client = new Client(apiName);

        if (bodyType === 'json-param') {
            bodyParams = bodyParams[Object.keys(bodyParams)[0]];
        }

        client.authRequest(accessToken, method, path, queryParams, bodyParams, headers)
            .then(
                function(response) {
                    flux.dispatch(constants.REQUEST_SUCCESS, {
                        endpointName : endpointName,
                        response     : response
                    });
                },
                function() {
                    flux.dispatch(constants.REQUEST_FAILURE, endpointName);
                }
            ).done();

        flux.dispatch(constants.REQUEST, {
            requestInfo  : client.getLastRequestInfo(),
            endpointName : endpointName
        });
    },

    request : function(apiName, endpointName, method, path, queryParams, bodyParams, headers, bodyType)
    {
        var client, flux = this;

        client = new Client(apiName);

        if (bodyType === 'json-param') {
            bodyParams = bodyParams[Object.keys(bodyParams)[0]];
        }

        client.request(method, path, queryParams, bodyParams, headers)
            .then(
                function(response) {
                    flux.dispatch(constants.REQUEST_SUCCESS, {
                        endpointName : endpointName,
                        response     : response
                    });
                },
                function() {
                    flux.dispatch(constants.REQUEST_FAILURE, endpointName);
                }
            ).done();

        flux.dispatch(constants.REQUEST, {
            requestInfo  : client.getLastRequestInfo(),
            endpointName : endpointName
        });
    },

    setRequestValues : function(endpointName, values)
    {
        this.dispatch(constants.SET_REQUEST_VALUES, {
            endpointName : endpointName,
            values       : values
        });
    },

    addToExcludedFields : function(endpointName, field)
    {
        this.dispatch(constants.REQUEST_ADD_TO_EXCLUDED_FIELDS, {
            endpointName : endpointName,
            field        : field
        });
    },

    removeFromExcludedFields : function(endpointName, field)
    {
        this.dispatch(constants.REQUEST_REMOVE_FROM_EXCLUDED_FIELDS, {
            endpointName : endpointName,
            field        : field
        });
    },

    addToNullFields : function(endpointName, field)
    {
        this.dispatch(constants.SET_NULL_VALUE, {
            endpointName : endpointName,
            field        : field
        });
    },

    removeFromNullFields : function(endpointName, field)
    {
        this.dispatch(constants.UNSET_NULL_VALUE, {
            endpointName : endpointName,
            field        : field
        });
    }
};
