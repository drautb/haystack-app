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

      $('#startTimePicker').datetimepicker();
      $('#startTimePicker').data('DateTimePicker').date(moment());

      $('#endTimePicker').datetimepicker();
      $('#endTimePicker').data('DateTimePicker').date(moment().subtract(90, 'days'));

      var engine = new Bloodhound({
        local: [{
          value: 'ben'
        }, {
          value: 'brittney'
        }, {
          value: 'abby'
        }, {
          value: 'baby'
        }, {
          value: 'disneyland'
        }, {
          value: 'vacation'
        }, {
          value: 'cabin'
        }, {
          value: 'boating'
        }, {
          value: 'zoo'
        }],
        datumTokenizer: function(d) {
          return Bloodhound.tokenizers.whitespace(d.value);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace
      });

      engine.initialize();

      $('#searchByTags').tokenfield({
        typeahead: [null, {
          source: engine.ttAdapter(),
          displayKey: 'value'
        }]
        // autocomplete: {
        //   source: ['red', 'blue', 'green', 'yellow', 'violet', 'brown', 'purple', 'black', 'white'],
        //   delay: 100
        // },
        // showAutocompleteOnFocus: true
      });
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