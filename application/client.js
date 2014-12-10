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

    /**
     * Make a request without authentication
     *
     * @param  {String} method      HTTP method
     * @param  {String} path        Endpoint path
     * @param  {Object} queryParams
     * @param  {Object} bodyParams
     * @param  {Object} headers
     * @return promise
     */
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

    /**
     * Make a request with authentication
     *
     * @param  {String} method      HTTP method
     * @param  {String} path        Endpoint path
     * @param  {Object} queryParams [description]
     * @param  {Object} bodyParams  [description]
     * @param  {Object} headers     [description]
     * @return promise
     */
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

    /**
     * Set the info returned by getLastRequestInfo
     *
     * @param  {String} method      HTTP method
     * @param  {String} path        Endpoint path
     * @param  {Object} queryParams [description]
     * @param  {Object} bodyParams  [description]
     * @param  {Object} headers     [description]
     */
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

    /**
     * Get info about the most recent request
     *
     * @return {Object}
     */
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
        var options, gateway = this;

        options = this._getRequestOptions(method, path);

        _.extend(options.headers, headers);

        if (queryParams && ! _(queryParams).isEmpty()) {
            options.path = path + '?' + this._toQuery(queryParams);
        }

        if (_.isUndefined(headers)) {
            headers = {};
        }

        this.setLastRequestInfo(method, path, queryParams, bodyParams, options.headers);

        return Q.Promise(_.bind(function(resolve, reject) {
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
