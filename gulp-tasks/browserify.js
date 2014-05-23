/* jshint node: true */
'use strict';

var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    browserify = require('browserify'),
    watchify   = require('watchify'),
    reactify   = require('reactify'),
    envify     = require('envify/custom'),
    source     = require('vinyl-source-stream'),
    streamify  = require('gulp-streamify'),
    connect    = require('gulp-connect'),
    uglify     = require('gulp-uglify');

var appBundler = function(watch)
{
    var bundler, rebundle,
        options = {
            entries: ['./application/bootstrap.js'],
            extensions: ['.js', '.jsx']
        };

    if (watch) {
        bundler = watchify(options);
    } else {
        bundler = browserify(options);
    }

    bundler.external('config')
        .transform(reactify);

    rebundle = function() {
        var stream = bundler.bundle({debug: (gutil.env.build !== 'production')});
        stream.on('error', gutil.log);
        stream = stream.pipe(source('app.js'))
            .pipe(gutil.env.build === 'production' ? streamify(uglify()) : gutil.noop())
            .pipe(gulp.dest('./build/js'))
            .pipe(connect.reload());

        return stream;
    };

    bundler.on('update', rebundle);
    return rebundle();
};

gulp.task('watchify:app', function() {
    return appBundler(true);
});

gulp.task('browserify:app', function() {
    return appBundler(false);
});

gulp.task('browserify:config', function() {
    var env = (! gutil.env.build ) ? 'development' : gutil.env.build;
    return browserify()
        .require('./application/config/config.'+env+'.js', { expose : 'config' })
        .transform(envify({
            NODE_ENV: (gutil.env.build === 'production') ? 'production' : 'development'
        }))
        .bundle()
        .pipe(source('config.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./build/js'))
        .pipe(connect.reload());
});
