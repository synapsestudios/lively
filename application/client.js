'use strict';

var HttpGateway = require('synapse-common/http/gateway');
var Q           = require('q');
var http        = require('http');
var https       = require('https');
var config      = require('./config');
var _           = require('underscore');

module.exports = HttpGateway.extend({

    constructor : function(namespace)
    {
        this.config = config.apis[namespace].api;
        this.oauthConfig = config.apis[namespace].oauth2;
    },

    request : function(method, path, queryParams, bodyParams, headers)
    {
        this.accessToken = false;

        return this.apiRequest(
            method,
            path,
            queryParams,
            bodyParams,
            headers
        );
    },

    authRequest : function(accessToken, method, path, queryParams, bodyParams, headers)
    {
        this.accessToken = accessToken;

        return this.apiRequest(
            method,
            path,
            queryParams,
            bodyParams,
            headers
        );
    },

    setLastRequestInfo : function(method, path, queryParams, bodyParams, headers)
    {
        var uri, config, data;

        config = this.getConfig();

        uri = (config.secure ? 'https' : 'http') + '://' + config.hostname + path;

        data = _.extend({}, queryParams, bodyParams);

        this.lastRequestInfo = {
            method  : method,
            path    : path,
            uri     : uri,
            data    : data,
            headers : headers
        };
    },

    getLastRequestInfo : function()
    {
        return this.lastRequestInfo;
    },

    /**
     * Perform a request to the API
     *
     * @param  string  method       Request method
     * @param  string  path         Request path
     * @param  object  queryParams  Query params (if any)
     * @param  object  bodyParams   Body params (if any)
     * @param  object  headers      Additional headers (if any)
     * @return promise
     */
    apiRequest : function(method, path, queryParams, bodyParams, headers)
    {
        var gateway = this;

        this.setLastRequestInfo(method, path, queryParams, bodyParams, headers);

        if (queryParams && ! _(queryParams).isEmpty()) {
            path = path + '?' + this._toQuery(queryParams);
        }

        if (_.isUndefined(headers)) {
            headers = {};
        }

        return Q.Promise(_.bind(function(resolve, reject) {
            var options = this._getRequestOptions(method, path);

            _.extend(options.headers, headers);

            var req = (gateway.getConfig().secure ? https : http).request(options, function(response) {
                var responseText = '';

                response.on('data', function(chunk) {
                    responseText += chunk;
                });

                response.on('end', function() {
                    var responseData;

                    try {
                        responseData = JSON.parse(responseText);
                    } catch (e) {
                        responseData = responseText;
                    }

                    resolve({
                        data    : responseData,
                        headers : req.xhr.getAllResponseHeaders(),
                        status  : response.statusCode
                    });
                });
            });

            req.on('error', function(e) {
                reject(e);
            });

            if (bodyParams && ! _(bodyParams).isEmpty()) {
                if (_.isObject(bodyParams)) {
                    bodyParams = JSON.stringify(bodyParams);
                }

                req.write(bodyParams);
            }

            req.end();
        }, this));
    },

    _getRequestOptions : function(method, path)
    {
        var options, config;

        options = HttpGateway.prototype._getRequestOptions.call(this, method, path);

        config = this.getConfig();

        if (this.accessToken) {
            options.headers.Authorization = this.oauthConfig.tokenParam + ' ' + this.accessToken;
        }

        return options;
    }
});
