'use strict';

var constants = require('../constants');
var Client    = require('../client');

module.exports = {

    makeRequest : function(requiresAuth, apiName, endpointName, method, path, queryParams, bodyParams, headers, bodyType, rootParam)
    {
        var client, makeRequest, flux = this;

        client = new Client(apiName);

        if (bodyType === 'json-param') {
            bodyParams = bodyParams[rootParam];
        }

        makeRequest = (requiresAuth ? client.authRequest : client.request).bind(client);

        makeRequest(method, path, queryParams, bodyParams, headers)
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

    oauthRequest : function(apiName, endpointName, method, path, queryParams, bodyParams, headers, bodyType, rootParam)
    {
        var args = Array.prototype.slice.call(arguments);

        args.unshift(true);

        this.flux.actions.request.makeRequest.apply(this, args);
    },

    request : function(apiName, endpointName, method, path, queryParams, bodyParams, headers, bodyType, rootParam)
    {
        var args = Array.prototype.slice.call(arguments);

        args.unshift(false);

        this.flux.actions.request.makeRequest.apply(this, args);
    }
};
