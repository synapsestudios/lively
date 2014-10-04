/* jshint node: true */
'use strict';

var http   = require('http');
var https  = require('https');
var url    = require('url');
var qs     = require('querystring');
var config = require('./config');

module.exports = function(req, res) {
    var reqUrl = url.parse(req.url),
        query  = qs.parse(reqUrl.query);

    var apiConfig = config.apis[query.api];

    var httpLib = apiConfig.oauth2.port === 443 ? https : http;
    var proxyReq = httpLib.request({
        hostname           : apiConfig.oauth2.hostname,
        port               : apiConfig.oauth2.port,
        path               : apiConfig.oauth2.tokenUrl,
        method             : 'POST',
        rejectUnauthorized : false,
        headers  : {
            'Accept'       : 'application/json',
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }, function(proxyRes) {
        var data = '';
        proxyRes.on('data', function(chunk) {
            data += chunk;

            // Check for too much data from flood attack or faulty client
            if (data.length > 1e6) {
                data = '';
                res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                req.connection.destroy();
            }
        });

        proxyRes.on('end', function() {
            try {
                var json     = JSON.parse(data),
                    hostname = config.lively.hostname,
                    port     = config.lively.port;

                json.client_id     = query.client_id;
                json.client_secret = query.client_secret;

                res.writeHead(302, {
                    Location : 'http://' + hostname + ':' + port + '/'+query.api + '?' + qs.stringify(json)
                });
            } catch (e) {
                res.write(data);
            }

            res.end();
        });
    });

    proxyReq.on('error', function(e) {
        console.log(e);
    });

    proxyReq.write(qs.stringify({
        grant_type    : 'authorization_code',
        code          : query.code,
        client_id     : query.client_id,
        client_secret : query.client_secret,
        scope         : query.scope,
        state         : Math.random(),
        redirect_uri  : ''
    }));

    proxyReq.end();
};
