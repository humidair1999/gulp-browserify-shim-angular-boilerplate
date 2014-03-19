var fs = require('fs');

console.log(fs);

module.exports = function($routeProvider) {
	console.log(__dirname);

  $routeProvider
    .when('/', {
      controller: require('../controllers/main.js'),
      //templateUrl: 'js/app/views/main.html',
      template: fs.readFileSync('public/js/app/views/main.html')
    })
    .when('/page2', {
      controller: require('../controllers/page2.js'),
      //templateUrl: 'js/app/views/page2.html',
      template: fs.readFileSync('public/js/app/views/page2.html')
    });
};