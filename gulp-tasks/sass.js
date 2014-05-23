/* jshint node: true */
'use strict';

var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    sass       = require('gulp-sass'),
    minifyCss  = require('gulp-minify-css'),
    connect    = require('gulp-connect');

gulp.task('sass', function() {
    var isProduction = gutil.env.build === 'production';

    var sourceComments;

    if (isProduction) {
        sourceComments = 'none';
    } else if (process.platform === 'win32') {
        sourceComments = 'normal';
    } else {
        sourceComments = 'map';
    }

    gulp.src('./application/ui/scss/app.scss')
        .pipe(sass({
            errLogToConsole : true,
            sourceComments : sourceComments,
            outputStyle    : 'compressed',
            includePaths   : [
                './bower_components/foundation/scss'
            ]
        }))
        // production only because it breaks source maps
        .pipe(isProduction ? minifyCss({keepSpecialComments : '*'}) : gutil.noop())
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload());
});
