'use strict';

var constants = require('../constants');
var Client    = require('../client');

module.exports = {

    setApi : function(apiSlug)
    {
        this.dispatch(constants.SET_API, apiSlug);
    },

    setToken : function(data)
    {
        this.dispatch(constants.OAUTH2_SET_TOKEN, data);
    },

    oauthRequest : function(apiName, accessToken, method, path, data)
    {
        var client, flux = this;

        if (! accessToken) {
            return this.dispatch(constants.OAUTH_REQUEST_FAILURE);
        }

        client = new Client(apiName);

        flux.dispatch(constants.OAUTH_REQUEST);

        client.authRequest(accessToken, method, path, data)
            .then(function() {
                flux.dispatch(constants.OAUTH_REQUEST_SUCCESS);
            })
            .fail(function() {
                flux.dispatch(constants.OAUTH_REQUEST_FAILURE);
            });
    },

    request : function(apiName, method, path, data)
    {
        var client, flux = this;

        client = new Client(apiName);

        flux.dispatch(constants.OAUTH_REQUEST);

        client.request(method, path, data)
            .then(function() {
                flux.dispatch(constants.OAUTH_REQUEST_SUCCESS);
            })
            .fail(function() {
                flux.dispatch(constants.OAUTH_REQUEST_FAILURE);
            });
    }

};
