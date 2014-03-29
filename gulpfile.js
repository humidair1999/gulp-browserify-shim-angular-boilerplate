var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
	browserify = require('gulp-browserify'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify');

// default task acts as a 'dev' environment, watching your code and compiling as you
//  develop
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
            .pipe(gulp.dest('public/js/built'));
    }

    return rebundle();
});

gulp.task('libs-dev', function() {
    return gulp.src('blank-seed.js')
        .pipe(browserify({
            // enable sourcemaps
            debug: true
        }))
        .on('prebundle', function(bundle) {
            bundle.require('angular/angular.js', {
                expose: 'angular'
            });

            bundle.require('angular-route/angular-route.js', {
                expose: 'angular-route'
            });
        })
        // handle errors to avoid gulp crashing when a watched file has errors
        .on('error', gutil.log)
        .pipe(rename('libs.js'))
        .pipe(gulp.dest('public/js/built'));
});

gulp.task('libs-prod', function() {
    return gulp.src('blank-seed.js')
        .pipe(browserify({
            // disable sourcemaps
            debug: false
        }))
        .on('prebundle', function(bundle) {
            bundle.require('angular/angular.min.js', {
                expose: 'angular'
            });

            bundle.require('angular-route/angular-route.min.js', {
                expose: 'angular-route'
            });
        })
        // handle errors to avoid gulp crashing when a watched file has errors
        .on('error', gutil.log)
        // minify, preserving certain variables and keywords
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename('libs.js'))
        .pipe(gulp.dest('public/js/built'));
});

// prod task acts as preparation for a production environment
gulp.task('prod', function() {
    console.log('Bundling prod at:', new Date());

    return gulp.src('public/js/main.js')
        .pipe(browserify({
            transform: ['brfs'],
            debug: false,
            external: ['angular', 'angular-route']
        }))
        // handle errors to avoid gulp crashing when a watched file has errors
        .on('error', gutil.log)
        // minify, preserving certain variables and keywords
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('public/js/built'));
});