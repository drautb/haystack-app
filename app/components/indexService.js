'use strict';

var app = angular.module('haystack');

app.service('IndexService', [
  '$firebaseArray',
  '$q',
  'FirebaseService',
  'DATE_TAKEN_FIELD',
  'DATE_INDEXED_FIELD',
  function(
    $firebaseArray,
    $q,
    FirebaseService,
    DATE_TAKEN_FIELD,
    DATE_INDEXED_FIELD
  ) {
    var firebaseRef = FirebaseService.getRef();

    this.query = function(searchBy, startTime, endTime) {
      var orderBy = searchBy == 'taken' ? DATE_TAKEN_FIELD : DATE_INDEXED_FIELD;

      var queryObj = firebaseRef.orderByChild(orderBy).limitToLast(50);

      return $firebaseArray(queryObj);
    };
  }
]);