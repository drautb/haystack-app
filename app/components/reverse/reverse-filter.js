'use strict';

/* Filters */

angular.module('haystack')
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });