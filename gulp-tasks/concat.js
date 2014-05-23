'use strict';

var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    connect = require('gulp-connect');

gulp.task('concat', function() {
    gulp.src([
        'bower_components/modernizr/modernizr.js'
    ])
        .pipe(concat('vendor-header.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(connect.reload());
});