'use strict';

var app = angular.module('haystack');

app.service('FirebaseService', [
  '$rootScope',
  '$firebase',
  'FIREBASE_URL',
  function(
    $rootScope,
    $firebase,
    FIREBASE_URL
  ) {

    /**
     * Initialize our connection
     */
    var firebaseRef = new Firebase(FIREBASE_URL);
    firebaseRef.authWithCustomToken($rootScope.authToken, function(error, authData) {
      if (error) {
        console.error('Authentication to Firebase failed!', error);
      }
    });

    this.getRef = function() {
      return firebaseRef;
    };

    this.getObject = function(path) {
      return $firebase(firebaseRef.child(path)).$asObject();
    };

  }
]);