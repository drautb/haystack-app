'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('haystack', [
  'angular-loading-bar',
  'angularMoment',
  'bootstrapLightbox',
  'datetimepicker',
  'firebase',
  'ngRoute',
  'ui.bootstrap'
]);

app.constant('DATE_INDEXED_FIELD', 'dateIndexed');
app.constant('DATE_TAKEN_FIELD', 'dateTaken');
app.constant('FIREBASE_URL', 'https://haystack-index-dev.firebaseio.com/media');
app.constant('MOMENT_FMT', 'ddd, MMM Do YYYY [- ]h:mm a');
app.constant('PAGE_SIZE', 500);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeController'
    });
  }
])

app.config(function(LightboxProvider, MOMENT_FMT) {
  LightboxProvider.getImageUrl = function(media) {
    return 'http://haystack.local:8000/' + media.pathToMedia;
  };

  LightboxProvider.isVideo = function(media) {
    return media.type == 'MP4'
  }

  LightboxProvider.getImageCaption = function(media) {
    return moment.unix(media.dateTaken).tz('America/Denver').format(MOMENT_FMT);
  };
});

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