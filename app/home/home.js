"use strict";

var app = angular.module('haystack');

app.controller('HomeController', [
  '$firebaseArray',
  '$scope',
  'DATE_INDEXED_FIELD',
  'DATE_TAKEN_FIELD',
  'FirebaseService',
  'Lightbox',
  'MOMENT_FMT',
  'PAGE_SIZE',
  function(
    $firebaseArray,
    $scope,
    DATE_INDEXED_FIELD,
    DATE_TAKEN_FIELD,
    FirebaseService,
    Lightbox,
    MOMENT_FMT,
    PAGE_SIZE
  ) {
    var firebaseRef = FirebaseService.getRef();

    $scope.displayFilter = function(value, index, array) {
      if ($scope.imageTypes.indexOf(value.type) > -1) {
        return $scope.showPictures;
      }

      if ($scope.videoTypes.indexOf(value.type) > -1) {
        return $scope.showVideos;
      }
    };

    $scope.search = function() {
      var startTimeSeconds = moment($scope.startTime, MOMENT_FMT).unix(),
        endTimeSeconds = moment($scope.endTime, MOMENT_FMT).unix(),
        orderBy = $scope.searchBy == 'taken' ? DATE_TAKEN_FIELD : DATE_INDEXED_FIELD;

      var queryObj = firebaseRef.orderByChild(orderBy).limitToLast(PAGE_SIZE);
      $scope.media = $firebaseArray(queryObj);
    };

    $scope.openLightbox = function(index) {
      Lightbox.openModal($scope.media, index);
    };

    /**
     * Component Initialization for date pickers and token fields
     */
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
    });

    /**
     * Initialization
     */
    $scope.imageTypes = ['JPG', 'JPEG'];
    $scope.videoTypes = ['MP4'];

    $scope.searchBy = 'taken';

    $scope.datetimePickerOptions = {
      format: MOMENT_FMT
    };
    $scope.startTime = moment().subtract(90, 'days').format(MOMENT_FMT);
    $scope.endTime = moment().format(MOMENT_FMT);

    $scope.showPictures = true;
    $scope.showVideos = true;

    /**
     * Go
     */
    $scope.search();
  }
]);