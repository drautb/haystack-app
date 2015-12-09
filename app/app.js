'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('haystack', [
  'angularMoment',
  'datetimepicker',
  'firebase',
  'ngRoute'
]);

app.constant('FIREBASE_URL', 'https://haystack-index-dev.firebaseio.com/media');
app.constant('MOMENT_FMT', 'ddd, MMM Do YYYY [- ]h:mm a');
app.constant('DATE_TAKEN_FIELD', 'dateTaken');
app.constant('DATE_INDEXED_FIELD', 'dateIndexed');

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeController'
    });
  }
])

app.run(['$rootScope', '$window',
  function($rootScope, $window) {
    var localStorage = $window.localStorage;

    $rootScope.authToken = localStorage.getItem('fb-token');

    if (!$rootScope.authToken || $rootScope.authToken == 'null') {
      $rootScope.authToken = $window.prompt('What is your Firebase token?');
      localStorage.setItem('fb-token', $rootScope.authToken);
    }
  }
]);