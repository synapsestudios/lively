'use strict';

var http  = require('http');
var https = require('https');
var url   = require('url');

module.exports = {
    _request : function(options, data, cb)
    {
        if (! _.isFunction(cb)) {
            throw 'callback must be a function';
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
                    headers : req.xhr.getAllResponseHeaders(),
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
            headers : options.headers
        };
    },
};
