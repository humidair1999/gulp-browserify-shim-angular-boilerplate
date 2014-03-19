var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	browserify = require('gulp-browserify');

gulp.task('dev-js', function() {
    return gulp.src('public/js/main.js')
        .pipe(browserify({
        	// we have to transform the browserified version of node's 'fs' module to allow
        	//	it to pull in file references (like .html templates and partials) in a browser
        	//	context
        	transform: ['brfs'],
        	// enable sourcemaps
        	debug: true,
        	shim: {
	            angular: {
	                path: 'node_modules/angular/angular.js',
	                exports: 'angular'
	            },
	            'angular-route': {
	                path: 'node_modules/angular-route/angular-route.js',
	                exports: 'ngRoute',
	                depends: {
	                    angular: 'angular'
	                }
	            }
          	}
        }))
        // handle errors to avoid gulp crashing when a watched file has errors
        .on('error', gutil.log)
        .pipe(gulp.dest('public/js/built'));
});

gulp.task('prod-js', function() {
    return gulp.src('public/js/main.js')
        .pipe(browserify({
        	transform: ['brfs'],
        	debug: false,
        	shim: {
	            angular: {
	                path: 'node_modules/angular/angular.min.js',
	                exports: 'angular'
	            },
	            'angular-route': {
	                path: 'node_modules/angular-route/angular-route.min.js',
	                exports: 'ngRoute',
	                depends: {
	                    angular: 'angular'
	                }
	            }
          	}
        }))
        // minify!
        .pipe(uglify({
        	mangle: false
        }))
        .pipe(gulp.dest('public/js/built'));
});

// default task acts as a 'dev' environment, watching your code and compiling as you
//	develop
gulp.task('default', ['dev-js'], function() {
    gulp.watch('public/js/main.js', ['dev-js']);

    gulp.watch('public/js/app/**/*.js', ['dev-js']);
});

// prod task acts as preparation for a production environment
gulp.task('prod', ['prod-js']);