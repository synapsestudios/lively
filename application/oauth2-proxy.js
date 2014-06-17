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

    var apiConfig = config[query.api];

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
        });

        proxyRes.on('end', function() {
            var json = JSON.parse(data);

            res.writeHead(302, {
                Location : 'http://127.0.0.1:9001/'+query.api+'?' + qs.stringify(json)
            });

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
