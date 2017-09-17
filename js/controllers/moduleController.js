(function () {
'use strict';

var configurationApp = angular.module('configurationApp');

configurationApp.controller('moduleController',['$scope','moduleService','moduleConfigItemSetupService' ,'$mdDialog',function( $scope , moduleService ,moduleConfigItemSetupService ,$mdDialog)
	{
		var vm = this;
		vm.name = "";
		vm.description = "";

		vm.modulesList = [];

		moduleService.getAllModules().then(function( moduleList) { 
			vm.modulesList = moduleList;
		});
		
		vm.deleteModule = function( moduleId )
		{
			moduleService.deleteModule(moduleId).then ( function() {
				moduleService.getAllModules().then(function( moduleList) { 
					vm.modulesList = moduleList;
				});
			});
		};

		vm.showAddDialog = function() {
			vm.showEditModuleDialog(0).then( function() {
				moduleService.getAllModules().then(function( moduleList) { 
					vm.modulesList = moduleList;
				});				
			});
		};

		vm.showUpdateDialog = function( moduleId ) {
			vm.showEditModuleDialog(moduleId).then( function() {
				moduleService.getAllModules().then(function( moduleList) { 
					vm.modulesList = moduleList;
				});				
			});
		};

		vm.showEditModuleDialog = function ( moduleId ) {
			return $mdDialog.show({
				templateUrl: 'partials/moduleDialog.html',
				controller: 'moduleDialogController',
				controllerAs: 'vm',
				//targetEvent: ev,
				clickOutsideToClose: true,
				locals: {
					selectedModuleId: moduleId
				}
			  });
		};

	}]);
}());