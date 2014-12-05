'use strict';

var HttpGateway = require('synapse-common/http/gateway');
var config      = require('./config');
var _           = require('underscore');

module.exports = HttpGateway.extend({

    constructor : function(namespace)
    {
        this.config = config.apis[namespace].api;
    },

    request : function(method, path, data)
    {
        this.accessToken = false;

        return this.apiRequest(
            method,
            path,
            // One of these should be empty, so just combine them
            _.extend({}, data.query, data.body),
            data.headers
        );
    },

    authRequest : function(accessToken, method, path, data)
    {
        this.accessToken = accessToken;

        return this.apiRequest(
            method,
            path,
            // One of these should be empty, so just combine them
            _.extend({}, data.query, data.body),
            data.headers
        );
    },

    _getRequestOptions : function(method, path)
    {
        var options, config;

        options = HttpGateway.prototype._getRequestOptions.call(this, method, path);

        config = this.getConfig();

        if (this.accessToken) {
            options.headers.Authorization = config.tokenParam + ' ' + this.accessToken;
        }

        return options;
    }
});
