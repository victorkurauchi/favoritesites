'use strict';

/* Controllers */

angular.module('favsites.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('FavoriteController', function ($scope, $http) {

    function Favorite() {

      $http.get('/favorite').success(function(data) {

        console.log(data);

        $scope.favorites = data;

      }).error(function(data) {
        $scope.message = 'Ocorreu um erro inesperado, código: ' + data;
      });

      this.title = '';
      this.description = '';
      this.url = '';
      this.extra = '';
    }
   
    $scope.favorite = new Favorite();
   
    $scope.contatos = [];

    $scope.createFavorite = function() {
      $http.post('/favorite', $scope.favorite).success(function(data) {

        $scope.favorites.push(data);
        $scope.favorite = new Favorite();
      });
    }

    $scope.listFavorites = function() {
      $http.get('/favorite').success(function(data) {

        $scope.favorites = data;

      }).error(function(data) {
        $scope.message = 'Ocorreu um erro inesperado, código: ' + data;
      });
    }

  });
