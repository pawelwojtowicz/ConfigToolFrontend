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
        when('/devicepage', {
          templateUrl: 'partials/devicePage.html',
          controller: 'deviceController',
          controllerAs: 'vm',
          bindToController: true,
          replace: true      }).
        when('/templatepage', {
          templateUrl: 'partials/templatePage.html',
          controller: 'templateController',
          controllerAs: 'vm',
          bindToController: true,
          replace: true      }).
        when('/configitempage', {
          templateUrl: 'partials/configItemPage.html',
          controller: 'configItemController',
          controllerAs: 'vm',
          bindToController: true,
          replace: true      }).
        when('/parameterpage', {
          templateUrl: 'partials/parameterPage.html',
          controller: 'parameterController',
          controllerAs: 'vm',
          bindToController: true,
          replace: true      }).
        when('/templateedit/:templateId', {
          templateUrl: 'partials/templateEdit.html',
          controller: 'templateEditController',
          controllerAs: 'vm',
          bindToController: true,
          replace: true      }).
        when('/configurationpage', {
          templateUrl: 'partials/configurationPage.html',
          controller: 'configurationController',
          controllerAs: 'vm',
          bindToController: true,
          replace: true      }).
        when('/configurationdialog/:configurationId', {
          templateUrl: 'partials/configurationDialog.html',
          controller: 'configurationDialogController',
          controllerAs: 'vm',
          bindToController: true,
          replace: true      }).
        when('/configurationgrouppage', {
          templateUrl: 'partials/configurationGroupPage.html',
          controller: 'configuationGroupController',
          controllerAs: 'vm',
          bindToController: true,
          replace: true      }).
        when('/configurationgroupeditpage/:configurationGroupId', {
          templateUrl: 'partials/configurationGroupEdit.html',
          controller: 'configurationGroupDialogController',
          controllerAs: 'vm',
          bindToController: true,
          replace: true      }).
        when('/nodepage', {
            templateUrl: 'partials/nodePage.html',
            controller: 'nodePageController',
            controllerAs: 'vm',
            bindToController: true,
            replace: true      }).
        when('/exportconfiguration/:nodeId', {
          templateUrl: 'partials/exportConfigurationPage.html',
          controller: 'exportConfigurationPageController',
          controllerAs: 'vm',
          bindToController: true,
          replace: true      }).
        otherwise({
          redirectTo: '/templatepage'
      });
  }]);
}());
