(function () {
    'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.controller('exportConfigurationPageController',['nodeService', 'exportService','$routeParams',  function( nodeService , exportService,$routeParams )
	{
        var vm = this;
        vm.node = {};

        nodeService.getNodeById($routeParams.nodeId).then(function( nodeInfo) {
            vm.node = nodeInfo;
        });

        vm.exportConfigItem = function( nodeStringId, configurationItemId) {
            console.log("exporting= " + nodeStringId +", "+ String(configurationItemId));
            exportService.exportConfigurationItem(nodeStringId, configurationItemId);
        };

	}]);
}());
