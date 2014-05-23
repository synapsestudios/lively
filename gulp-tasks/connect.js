'use strict';

var gulp       = require('gulp'),
    connect    = require('gulp-connect'),
    modRewrite = require('connect-modrewrite');

gulp.task('connect', function() {
    connect.server({
        root       : 'build',
        port       : 9001,
        livereload : true,
        middleware : function (connect, options) {
            return [
                modRewrite(['!\\..*$ /index.html [L]'])
            ];
        }
    });
});
