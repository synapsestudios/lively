'use strict';

var constants = require('../constants');
var Client    = require('../client');

module.exports = {

    oauthRequest : function(apiName, accessToken, method, path, queryParams, bodyParams, headers)
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

        flux.dispatch(constants.REQUEST, client.getLastRequestInfo());
    },

    request : function(apiName, method, path, queryParams, bodyParams, headers)
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

        flux.dispatch(constants.REQUEST, client.getLastRequestInfo());
    }

};
