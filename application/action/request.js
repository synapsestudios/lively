'use strict';

var constants = require('../constants');
var Client    = require('../client');

module.exports = {

    oauthRequest : function(apiName, endpointName, accessToken, method, path, queryParams, bodyParams, headers, bodyType, rootParam)
    {
        var client, flux = this;

        if (! accessToken) {
            return this.dispatch(constants.REQUEST_FAILURE);
        }

        client = new Client(apiName);

        if (bodyType === 'json-param') {
            bodyParams = bodyParams[rootParam];
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

    request : function(apiName, endpointName, method, path, queryParams, bodyParams, headers, bodyType, rootParam)
    {
        var client, flux = this;

        client = new Client(apiName);

        if (bodyType === 'json-param') {
            bodyParams = bodyParams[rootParam];
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
    }
};
