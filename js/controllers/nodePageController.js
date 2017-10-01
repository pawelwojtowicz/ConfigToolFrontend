(function () {
    'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.controller('nodePageController',['nodeService','$mdDialog','$location',function( nodeService, $mdDialog, $location )
	{
        var vm = this;
        vm.nodes = [];

        nodeService.getAllNodes().then( function( nodes) {
            vm.nodes = nodes;
        });

        vm.addNewNode = function() {
            vm.showNodeEditDialog("").then( function() {
                nodeService.getAllNodes().then( function( nodes) {
                    vm.nodes = nodes;
                });
            });
        };

        vm.modifyNode = function( nodeStringId ) {
            vm.showNodeEditDialog(nodeStringId).then( function() {
                nodeService.getAllNodes().then( function( nodes) {
                    vm.nodes = nodes;
                });
            });
        };

        vm.deleteNode = function( nodeStringId) {
            nodeService.deleteNode(nodeStringId).then( function() {
                nodeService.getAllNodes().then( function( nodes) {
                    vm.nodes = nodes;
                });                        
            });
        };

        vm.showNodeEditDialog = function( nodeId ) {
            return $mdDialog.show({
				templateUrl: 'partials/nodeDialog.html',
				controller: 'nodeDialogController',
				controllerAs: 'vm',
				//targetEvent: ev,
				clickOutsideToClose: true,
				locals: {
					selectedNodeId: nodeId
				}
			  });

        };

        vm.showExportDialog = function( nodeId ) {
            var urlOfExportPage = "/exportconfiguration/"+ nodeId;
            $location.url(urlOfExportPage);
        };
	}]);
}());