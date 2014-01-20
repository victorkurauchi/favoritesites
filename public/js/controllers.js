'use strict';

/* Controllers */

angular.module('favsites.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

  }).
  controller('FavoriteController', function ($scope, $http, Icons) {

    function Favorite() {

      this.title = '';
      this.description = '';
      this.url = '';
      this.extra = '';
    }

    //console.log(Icons.getFavicon('http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local'));

    $http.get('/api/favorites').success(function(data) {

        for (var x in data) {
          if (data.hasOwnProperty(x)) {
            //console.log(Icons.getFavicon(data[x].url));
            //data[x].image = Icons.getFavicon(data[x].url);
            console.log(data[x]);
          }
        }

        $scope.favorites = data;

      }).error(function(data) {
        $scope.message = 'Ocorreu um erro inesperado, código: ' + data;
      });
   
    $scope.favorite  = new Favorite();
    $scope.favorites = [];

    $scope.createFavorite = function() {
      $http.post('/api/favorite', $scope.favorite).success(function(data) {

        $scope.favorites.push(data);
        $scope.favorite = new Favorite();
      });
    }

  });
