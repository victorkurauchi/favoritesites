'use strict';

// Declare app level module which depends on filters, and services

angular.module('favsites', [
  'favsites.controllers',
  'favsites.filters',
  'favsites.services',
  'favsites.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/inicio', {
      templateUrl: 'partials/favorite',
      controller: 'FavoriteController'
    }).
    otherwise({
      redirectTo: '/inicio'
    });

  $locationProvider.html5Mode(true);
});
