'use strict';

var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    preprocess = require('gulp-preprocess'),
    connect    = require('gulp-connect');

gulp.task('html', function() {
    gulp.src('./application/index.html')
        .pipe(preprocess({
            context: {
                ENVIRONMENT: gutil.env.build || 'development'
            }
        }))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});