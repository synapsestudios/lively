/* global setTimeout */
'use strict';

var _           = require('underscore');
var BaseStore   = require('synapse-common/store/base');
var SyncMachine = require('synapse-common/lib/sync-machine');
var store       = require('store');
var http        = require('http');
var https       = require('https');

var Store = BaseStore.extend({

    clientId     : null,
    clientSecret : null,
    hostname     : null,
    port         : 80,
    authorizeUrl : null,
    tokenUrl     : null,
    tokenParam   : 'Bearer',
    accessToken  : null,
    tokenType    : null,
    rawData      : null,

    constructor : function()
    {
        if (store.get('oauth')) {
            this.unserializeFromLocalStorage();
        }

        this.on('change', function() {
            this.serializeToLocalStorage();
        });
    },

    setOptions : function(clientId, clientSecret, hostname, port, authorizeUrl, tokenUrl, tokenParam)
    {
        this.clientId     = clientId;
        this.clientSecret = clientSecret;
        this.hostname     = hostname;
        this.port         = port;
        this.authorizeUrl = authorizeUrl;
        this.tokenUrl     = tokenUrl;
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

        var httpLib = (options.port === 443) ? https : http;

        var req = httpLib.request(options, function (res) {
            var resText = '';

            res.on('data', function(chunk) {
                resText += chunk;
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
            data    : req.body,
            headers : req._headers
        };
    },

    oauthRequest : function(method, path, data, cb)
    {
        if (! this.accessToken) {
            // Next tick because async callbacks should always be async
            setTimeout(function() {
                cb('Missing access token for OAuth request');
            }, 0);

            return;
        }

        var options = {
            hostname : this.hostname,
            port     : this.port,
            method   : method,
            path     : path,
            headers  : {
                'X-Debug': true,
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization': this.tokenParam + ' ' + this.accessToken
            }
        };

        return this._request(options, data, cb);
    },

    request : function(method, path, data, cb)
    {
        var options = {
            hostname : this.hostname,
            port     : this.port,
            method   : method,
            path     : path,
            headers  : {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            }
        };

        return this._request(options, data, cb);
    },

    serializeToLocalStorage : function()
    {
        store.set('oauth', {
            clientId     : this.clientId,
            clientSecret : this.clientSecret,
            hostname     : this.hostname,
            port         : this.port,
            authorizeUrl : this.authorizeUrl,
            tokenUrl     : this.tokenUrl,
            accessToken  : this.accessToken,
            tokenType    : this.tokenType,
            rawData      : this.rawData
        });
    },

    unserializeFromLocalStorage : function()
    {
        var data = store.get('oauth');

        this.clientId     = data.clientId;
        this.clientSecret = data.clientSecret;
        this.hostname     = data.hostname;
        this.port         = data.port;
        this.authorizeUrl = data.authorizeUrl;
        this.tokenUrl     = data.tokenUrl;
        this.accessToken  = data.accessToken;
        this.tokenType    = data.tokenType;
        this.rawData      = data.rawData;
    }
});

_.extend(Store.prototype, SyncMachine);

module.exports = Store;
