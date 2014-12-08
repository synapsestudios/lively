'use strict';

var constants = require('../constants');
var Client    = require('../client');

module.exports = {

    oauthRequest : function(apiName, endpointId, accessToken, method, path, queryParams, bodyParams, headers)
    {
        var client, flux = this;

        if (! accessToken) {
            return this.dispatch(constants.REQUEST_FAILURE);
        }

        client = new Client(apiName);

        client.authRequest(accessToken, method, path, queryParams, bodyParams, headers)
            .then(function(response) {
                flux.dispatch(constants.REQUEST_SUCCESS, response);
            })
            .fail(function() {
                flux.dispatch(constants.REQUEST_FAILURE);
            });

        flux.dispatch(constants.REQUEST, {
            requestInfo : client.getLastRequestInfo(),
            endpointId  : endpointId
        });
    },

    request : function(apiName, endpointId, method, path, queryParams, bodyParams, headers)
    {
        var client, flux = this;

        client = new Client(apiName);

        client.request(method, path, queryParams, bodyParams, headers)
            .then(function(response) {
                flux.dispatch(constants.REQUEST_SUCCESS, response);
            })
            .fail(function() {
                flux.dispatch(constants.REQUEST_FAILURE);
            });

        flux.dispatch(constants.REQUEST, {
            requestInfo : client.getLastRequestInfo(),
            endpointId  : endpointId
        });
    }

};