(function(angular) {
  "use strict";

  var app = angular.module('haystack.home', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute']);

  app.controller('HomeCtrl', ['$scope', 'fbutil', 'user', '$firebaseObject', 'FBURL',
    function($scope, fbutil, user, $firebaseObject, FBURL) {
      $scope.syncedValue = $firebaseObject(fbutil.ref('syncedValue'));
      $scope.user = user;
      $scope.FBURL = FBURL;

      $scope.getNumber = function(n) {
        return new Array(n);
      };
    }
  ]);


  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl',
        resolve: {
          user: ['Auth',
            function(Auth) {
              return Auth.$waitForAuth();
            }
          ]
        }
      });
    }
  ]);

})(angular);