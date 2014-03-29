var fs = require('fs');

module.exports = function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: ['$scope', require('../controllers/main')],
            //templateUrl: 'js/app/views/main.html',
            template: fs.readFileSync('public/js/app/views/main.html')
        })
        .when('/page2', {
            controller: ['$scope', require('../controllers/page2')],
            //templateUrl: 'js/app/views/page2.html',
            template: fs.readFileSync('public/js/app/views/page2.html')
        });
};