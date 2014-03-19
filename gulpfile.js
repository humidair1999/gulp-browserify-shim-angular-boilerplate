var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	browserify = require('gulp-browserify');

gulp.task('dev-js', function() {
    return gulp.src('public/js/main.js')
        .pipe(browserify({
        	transform: ['brfs'],
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
        .pipe(uglify({
        	mangle: false
        }))
        .pipe(gulp.dest('public/js/built'));
});

gulp.task('default', ['dev-js'], function() {
    gulp.watch('public/js/main.js', ['dev-js']);

    gulp.watch('public/js/app/**/*.js', ['dev-js']);
});

gulp.task('prod', ['prod-js']);