require('angular');
require('angular-route');

console.log(angular);

angular.module('myApp', ['ngRoute'])
	.config(require('./app/routes/routes'));