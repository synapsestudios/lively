'use strict';

var constants = require('../constants');
var Client    = require('../client');

module.exports = {

    oauthRequest : function(apiName, endpointName, accessToken, method, path, data, headers)
    {
        var client, flux = this;

        if (! accessToken) {
            return this.dispatch(constants.REQUEST_FAILURE);
        }

        client = new Client(apiName);

        client.authRequest(method, path, data, headers)
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
            requestInfo : client.getLastRequestInfo(),
            endpointName  : endpointName
        });
    },

    request : function(apiName, endpointName, method, path, data, headers)
    {
        var client, flux = this;

        client = new Client(apiName);

        client.request(method, path, data, headers)
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
            requestInfo : client.getLastRequestInfo(),
            endpointName  : endpointName
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
    }

};
