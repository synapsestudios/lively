'use strict';

var constants = require('../constants');
var client = require('../client');

module.exports = {

    setOptions : function(data)
    {
        this.dispatch(constants.OAUTH2_SET_OPTIONS, data);
    },

    setToken : function(data)
    {
        this.dispatch(constants.OAUTH2_SET_TOKEN, data);
    },

    oauth2Request : function(method, path, data, cb)
    {
        if (! this.accessToken) {
            // Next tick because async callbacks should always be async
            _.defer(function() {
                cb('Missing access token for OAuth request');
            });

            return;
        }

        data.header = _.extend(data.header, {
            Authorization : this.getAuthorizationHeader()
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

};
