/* globals File, FileReader, Uint8Array, Buffer */
'use strict';

var HttpGateway = require('synapse-common/http/gateway');
var AuthGateway = require('synapse-common/http/auth-gateway');
var Q           = require('q');
var http        = require('http');
var https       = require('https');
var config      = require('./config');
var _           = require('underscore');
var store       = require('store');

module.exports = HttpGateway.extend({

    constructor : function(namespace)
    {
        this.config      = config.apis[namespace].api;
        this.oauthConfig = config.apis[namespace].oauth2;

        authGateway    = new AuthGateway(this.oauthConfig);
        this.handle401 = authGateway.handle401;

        this.tokenStorageLocation = namespace + 'token';
    },

    /**
     * Make a request without authentication
     *
     * @param  {String} method  HTTP method
     * @param  {String} path    Endpoint path
     * @param  {Object} data    The request data
     * @param  {Object} headers The request headers
     * @return promise
     */
    request : function(method, path, data, headers)
    {
        this.accessToken = false;

        return this.apiRequest(method, path, data, headers);
    },

    /**
     * Make a request with authentication
     *
     * @param  {String} method  HTTP method
     * @param  {String} path    Endpoint path
     * @param  {Object} data    The request data
     * @param  {Object} headers The request headers
     * @return promise
     */
    authRequest : function(method, path, data, headers)
    {
        this.accessToken = store.get(this.tokenStorageLocation);

        return this.apiRequest(method, path, data, headers);
    },

    /**
     * Set the info returned by getLastRequestInfo
     *
     * @param  {String} method  HTTP method
     * @param  {String} path    Endpoint path
     * @param  {Object} data    The request data
     * @param  {Object} headers The request headers
     */
    setLastRequestInfo : function(method, path, data, headers)
    {
        var uri, config, data;

        config = this.getConfig();
        path   = this.getPathWithParams(method, path, data);
        uri    = (config.secure ? 'https' : 'http') + '://' + config.hostname + path;

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
    apiRequest : function(method, path, data, headers)
    {
        var options, reader, boundaryKey, gateway = this;

        options = this.getRequestOptions(method, path);

        _.extend(options.headers, headers);

        options.path = this.getPathWithParams(method, path, data);

        if (_.isUndefined(headers)) {
            headers = {};
        }

        this.setLastRequestInfo(method, path, data, options.headers);

        if (bodyParams instanceof File) {
            boundaryKey                       = Math.random().toString(16);
            options.headers['Content-Type']   = 'multipart/form-data; boundary=' + boundaryKey;
            options.headers['Content-Length'] = bodyParams.size;
        }

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

                    if (response.statusCode === 401 && access_token !== false) {
                        gateway.handle401(resolve, reject, method, path, data, headers);
                    } else {
                        resolve({
                            data    : responseData,
                            headers : req.xhr.getAllResponseHeaders(),
                            status  : response.statusCode
                        });
                    }
                });
            });

            req.on('error', function(e) {
                reject(e);
            });

            if (bodyParams && ! _(bodyParams).isEmpty()) {
                if (bodyParams instanceof File) {
                    reader = new FileReader();
                    reader.onloadend = function () {
                        req.write(gateway.getUploadPayload(bodyParams, reader.result, boundaryKey));
                        req.end();
                    };
                    reader.readAsArrayBuffer(bodyParams);
                } else if (_.isObject(bodyParams)) {
                    bodyParams = JSON.stringify(bodyParams);
                    req.write(bodyParams);
                    req.end();
                } else {
                    req.write(bodyParams);
                    req.end();
                }
            } else {
                req.end();
            }
        }, this));
    },

    /**
     * Return the path, with GET parameters appended only if the method is GET
     *
     * @param  {String} method HTTP Method
     * @param  {String} path   Request path
     * @param  {Object} data   Request data
     * @return {String}
     */
    getPathWithParams : function(method, path, data)
    {
        if (method.toUpperCase() === 'GET' && ! _(data).isEmpty()) {
            path = path + '?' + this.toQuery(data);
        }

        return path;
    },

    /**
     * Get a Uint8Array that can be passed to request.write() to upload a file
     *
     * @param  {File} file                   File object
     * @param  {ArrayBuffer} fileArrayBuffer
     * @param  {String} boundaryKey
     * @return {Uint8Array}
     */
    getUploadPayload : function(file, fileArrayBuffer, boundaryKey)
    {
        var prefix, suffix, dataString, payloadString, payloadTypedArray;

        prefix        = this.getBodyPrefixForFileUpload(file, boundaryKey);
        suffix        = '\r\n--' + boundaryKey + '--\r\n';
        dataString    = this.convertArrayBufferToString(fileArrayBuffer);
        payloadString = prefix + dataString + suffix;

        payloadTypedArray = new Uint8Array(payloadString.length);
        for (var i = 0; i < payloadString.length; i += 1) {
            payloadTypedArray[i] = payloadString.charCodeAt(i);
        }

        return payloadTypedArray;
    },

    /**
     * Convert an ArrayBuffer to a binary string
     *
     * @param  {ArrayBuffer} arrayBuffer
     * @return {String}
     */
    convertArrayBufferToString : function(arrayBuffer)
    {
        var buffer;

        buffer = new Buffer(new Uint8Array(arrayBuffer));

        return buffer.toString('binary');
    },

    getBodyPrefixForFileUpload : function(file, boundaryKey)
    {
        return (
            '--' + boundaryKey + '\r\n' +
            'Content-Disposition: form-data; name="file"; filename="' + file.name + '"\r\n' +
            'Content-Type: application/octet-stream\r\n\r\n'
        );
    },

    getRequestOptions : function(method, path)
    {
        var options, config;

        options = HttpGateway.prototype.getRequestOptions.call(this, method, path);

        config = this.getConfig();

        if (this.accessToken !== false) {
            options.headers.Authorization = this.oauthConfig.tokenParam + ' ' + this.accessToken;
        }

        return options;
    }
});
