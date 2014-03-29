require('angular');
require('angular-route');

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', require('./app/routes/routes')]);