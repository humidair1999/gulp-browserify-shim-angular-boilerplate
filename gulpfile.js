var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    browserify = require('gulp-browserify'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify');

// libs-dev task compiles all external libs, preserving sourcemaps
//  and exposing aliases for app code to reference
gulp.task('libs-dev', function() {
    return gulp.src('./blank-seed.js')
        .pipe(browserify({
            // enable sourcemaps
            debug: true
        }))
        .on('prebundle', function(bundle) {
            bundle.require('./bower_components/angular/angular.js', {
                expose: 'angular'
            });

            bundle.require('./bower_components/angular-route/angular-route.js', {
                expose: 'angular-route'
            });
        })
        // handle errors to avoid gulp crashing when a watched file has errors
        .on('error', gutil.log)
        .pipe(rename('libs.js'))
        .pipe(gulp.dest('./public/js/built'));
});

// libs-prod task compiles all external libs, removing sourcemaps,
//  exposing aliases, and minifying
gulp.task('libs-prod', function() {
    return gulp.src('./blank-seed.js')
        .pipe(browserify({
            // disable sourcemaps
            debug: false
        }))
        .on('prebundle', function(bundle) {
            bundle.require('./bower_components/angular/angular.min.js', {
                expose: 'angular'
            });

            bundle.require('./bower_components/angular-route/angular-route.min.js', {
                expose: 'angular-route'
            });
        })
        // handle errors to avoid gulp crashing when a watched file has errors
        .on('error', gutil.log)
        // minify, preserving certain variables and keywords because we can't
        //  necessarily trust lib authors!
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename('libs.js'))
        .pipe(gulp.dest('./public/js/built'));
});

// default task acts as a 'dev' environment, watching your code and
//  compiling as you develop
gulp.task('default', function() {
    var bundler = watchify('./public/js/main.js');

    bundler.transform('brfs');

    bundler.external('angular');
    bundler.external('angular-route');
        
    bundler.on('update', rebundle);

    function rebundle () {
        console.log('Bundling dev at:', new Date());

        return bundler.bundle({
                debug: true
            })
            .on('error', gutil.log)
            .pipe(source('app.js'))
            .pipe(gulp.dest('./public/js/built'));
    }

    return rebundle();
});

// app-prod task acts as preparation for a production environment,
//  removing sourcemaps and minifying your app code
gulp.task('app-prod', function() {
    console.log('Bundling app-prod at:', new Date());

    return gulp.src('./public/js/main.js')
        .pipe(browserify({
            transform: ['brfs'],
            debug: false,
            external: ['angular', 'angular-route']
        }))
        // handle errors to avoid gulp crashing when a watched file has errors
        .on('error', gutil.log)
        // minify; don't need to prevent mangling as long as you use proper
        //  DI syntax in angular
        .pipe(uglify())
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./public/js/built'));
});