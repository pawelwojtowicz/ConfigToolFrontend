(function () {
'use strict';

var configurationFrontend = angular.module('configurationApp', ['ngMaterial','ngRoute']);

configurationFrontend.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/modulepage', {
        templateUrl: 'partials/modulePage.html',
        controller: 'moduleController',
		    controllerAs: 'vm',
		    bindToController: true,
		    replace: true      }).
      when('/templatepage', {
        templateUrl: 'partials/templatePage.html',
        controller: 'templateController',
    		controllerAs: 'vm',
		    bindToController: true,
		    replace: true      }).
      otherwise({
        redirectTo: '/templatepage'
      });
  }]);
}());
