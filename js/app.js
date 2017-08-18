(function () {
'use strict';

var configurationFrontend = angular.module('configurationApp', ['ngMaterial','ngRoute'])

configurationFrontend.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/modulepage', {
        templateUrl: 'partials/modulepage.html',
        controller: 'moduleController',
		    controllerAs: 'vm',
		    bindToController: true,
		    replace: true      }).
      when('/modulepage2', {
        templateUrl: 'partials/modulepage.html',
        controller: 'moduleController',
    		controllerAs: 'vm',
		    bindToController: true,
		    replace: true      }).
      otherwise({
        redirectTo: '/modulepage'
      });
  }]);
}());
