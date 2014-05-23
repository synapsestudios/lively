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

    setOptions : function(clientId, clientSecret, hostname, port, authorizeUrl, tokenUrl)
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

    request : function(method, path, data, cb)
    {
        this.beginSync();

        if (! _.isFunction(cb)) {
            throw "callback must be a function";
        }

        var httpLib = (this.port === 443) ? https : http,
            self    = this;

        var req = httpLib.request({
            hostname : this.hostname,
            port     : this.port,
            method   : method,
            path     : path,
            headers  : {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            }
        }, function(res) {
            var resText = '';

            res.on('data', function(chunk) {
                resText += chunk;
            });

            res.on('end', function() {
                var json;
                try {
                    json = JSON.parse(resText);
                } catch (e) {
                    self.emit('error', res);
                    cb(e);
                    return;
                }

                cb(false, json);

                self.finishSync();
                self.emit('change');
            });
        });

        req.on('error', function(e) {
            cb(e);

            this.abortSync();
            self.emit('error', e);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
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
