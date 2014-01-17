'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('favsites.services', []).
  value('version', '0.1')
  .factory('Icons', function($http) {

    return {
      getFavicon: function(url) {

        var favicon = undefined;

        $http.get(url).success(function(data) {

          console.log('retorno');
          console.log(data);

          var nodeList = document.getElementsByTagName("link");
          for (var i = 0; i < nodeList.length; i++) {
            if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon")) {
                favicon = nodeList[i].getAttribute("href");
            }
          }
        });
        
        return favicon;        
      }
    }
  });
