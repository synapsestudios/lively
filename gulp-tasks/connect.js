'use strict';

var gulp       = require('gulp'),
    connect    = require('gulp-connect'),
    url        = require('url'),
    fallback   = require('connect-history-api-fallback');

gulp.task('connect', function() {
    connect.server({
        root       : 'build',
        port       : 9001,
        livereload : true,
        middleware : function (connect, options) {
            return [
                function(req, res, next) {
                    var reqUrl = url.parse(req.url);
                    if (reqUrl.pathname === '/oauth2-redirect') {
                        require('../application/oauth2-proxy')(req, res);
                    } else {
                        next();
                    }
                },
                fallback
            ];
        }
    });
});
