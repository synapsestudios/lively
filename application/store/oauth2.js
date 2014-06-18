/* global console */
'use strict';

var _           = require('underscore');
var BaseStore   = require('synapse-common/store/base');
var SyncMachine = require('synapse-common/lib/sync-machine');
var store       = require('store');
var http        = require('http');
var https       = require('https');
var url         = require('url');

var Store = BaseStore.extend({

    namespace : null,

    clientId     : null,
    clientSecret : null,
    hostname     : null,
    port         : 80,
    secure       : false,
    tokenParam   : 'Bearer',
    accessToken  : null,
    tokenType    : null,
    rawData      : null,

    constructor : function(namespace)
    {
        this.namespace = namespace + '-';
        if (store.get(this.namespace + 'oauth')) {
            this.unserializeFromLocalStorage();
        }

        this.on('change', function() {
            this.serializeToLocalStorage();
        });
    },

    setOptions : function(options)
    {
        this.clientId     = options.clientId;
        this.clientSecret = options.clientSecret;
        this.hostname     = options.api.hostname;
        this.port         = options.api.port || 80;
        this.secure       = options.api.secure;
        this.tokenParam   = options.oauth2.tokenParam;
        this.emit('change');
    },

    setToken : function(data)
    {
        this.accessToken = data.accessToken;
        this.tokenType   = data.tokenType;
        this.rawData     = data.rawData;
        this.emit('change');
    },

    _request : function(options, data, cb)
    {
        if (! _.isFunction(cb)) {
            throw "callback must be a function";
        }

        var httpLib = (this.secure === true) ? https : http;

        var req = httpLib.request(options, function (res) {
            var resText = '';

            res.on('data', function(chunk) {
                resText += chunk;

                // Check for too much data from flood attack or faulty client
                if (resText.length > 1e6) {
                    resText = '';
                    res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();
                }
            });

            res.on('end', function() {
                var json;
                try {
                    json = JSON.parse(resText);
                } catch (e) {
                    json = {};
                }

                cb(false, {
                    data    : json,
                    headers : res.headers,
                    status  : res.statusCode
                });
            });
        });

        req.on('error', function(e) {
            console.log(e);
            cb(e);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();

        return {
            uri     : req.uri,
            data    : data,
            headers : req._headers
        };
    },

    oauthRequest : function(method, path, data, cb)
    {
        if (! this.accessToken) {
            // Next tick because async callbacks should always be async
            _.defer(function() {
                cb('Missing access token for OAuth request');
            });

            return;
        }

        data.header = _.extend(data.header, {
            Authorization : this.tokenParam + ' ' + this.accessToken
        });

        return this.request(method, path, data, cb);
    },

    request : function(method, path, data, cb)
    {
        var headers = _.extend({
            'Accept'       : 'application/json',
            'Content-Type' : 'application/json'
        }, data.header);

        // @todo update where we send data.body to request() to make it always a string
        // then we can remove the JSON.stringify from here and just do data.body.length
        if (data && data.body) {
            headers['Content-Length'] = JSON.stringify(data.body).length;
        }

        var urlParts = url.parse(path, true);
        var query    = _.extend({}, urlParts.query, data.query);

        var fixedPath = url.format({
            pathname : urlParts.pathname,
            query    : query,
            hash     : urlParts.hash
        });

        var options = {
            hostname        : this.hostname,
            port            : this.port,
            method          : method,
            path            : fixedPath,
            withCredentials : false,
            headers         : headers
        };

        return this._request(options, data.body, cb);
    },

    serializeToLocalStorage : function()
    {
        store.set(this.namespace + 'oauth', {
            clientId     : this.clientId,
            clientSecret : this.clientSecret,
            hostname     : this.hostname,
            port         : this.port,
            secure       : this.secure,
            tokenParam   : this.tokenParam,
            accessToken  : this.accessToken,
            tokenType    : this.tokenType,
            rawData      : this.rawData
        });
    },

    unserializeFromLocalStorage : function()
    {
        var data = store.get(this.namespace + 'oauth');

        this.clientId     = data.clientId;
        this.clientSecret = data.clientSecret;
        this.hostname     = data.hostname;
        this.port         = data.port;
        this.secure       = data.secure;
        this.tokenParam   = data.tokenParam;
        this.accessToken  = data.accessToken;
        this.tokenType    = data.tokenType;
        this.rawData      = data.rawData;
    }
});

_.extend(Store.prototype, SyncMachine);

module.exports = Store;
