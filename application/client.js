'use strict';

var HttpGateway = require('./http/gateway');
var AuthGateway = require('./http/auth-gateway');
var config      = require('./config');
var _           = require('underscore');

var Client = function(namespace)
{
    this.config = _.extend({}, config.apis[namespace].api);

    this.httpGateway = new HttpGateway();
    this.httpGateway.config = this.config;

    this.authGateway = new AuthGateway();
    this.authGateway.tokenStorageLocation = namespace + 'oauth';
    this.authGateway.config = this.config;
    this.authGateway.oauthConfig = _.extend({}, config.apis[namespace].oauth2);
};

_.extend(Client.prototype, {

    getConfig : function()
    {
        return this.config;
    },

    // Make either an auth or non-auth request, depending on value of requiresAuth arg
    makeRequest : function(requiresAuth, method, path, queryParams, bodyParams, headers)
    {
        var gateway, data;

        this.setLastRequestInfo(
            method,
            path,
            queryParams,
            bodyParams,
            _.extend({}, headers, this.authGateway.getRequestOptions(method, path).headers)
        );

        if (_(queryParams).isEmpty()) {
            data = bodyParams;
        } else {
            data = queryParams;
        }

        gateway = requiresAuth ? this.authGateway : this.gateway;

        return gateway.apiRequest(
            method,
            path,
            data,
            headers
        );
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
        return this.makeRequest(
            false,
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
    authRequest : function(method, path, queryParams, bodyParams, headers)
    {
        return this.makeRequest(
            true,
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

        if (queryParams && ! _(queryParams).isEmpty()) {
            path = path + '?' + this.toQuery(queryParams);
        }

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
    }
});

module.exports = Client;
