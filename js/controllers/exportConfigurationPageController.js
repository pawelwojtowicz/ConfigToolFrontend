(function () {
    'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.controller('exportConfigurationPageController',['nodeService', '$routeParams',  function( nodeService , $routeParams )
	{
        var vm = this;
        vm.node = {};

        nodeService.getNodeById($routeParams.nodeId).then(function( nodeInfo) {
            vm.node = nodeInfo;
        });

	}]);
}());
