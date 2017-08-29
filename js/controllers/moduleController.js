(function () {
'use strict';

var configurationApp = angular.module('configurationApp');

configurationApp.controller('moduleController',['$scope','moduleService','deviceService' ,'$mdDialog',function( $scope , moduleService ,deviceService ,$mdDialog)
	{
		var vm = this;
		vm.name = "";
		vm.description = "";

		vm.modulesList = [];

		moduleService.getAllModules().then(function( moduleList) { 
			vm.modulesList = moduleList;
		});

		vm.addNewModule = function() {
			var newModule = { "moduleId" : "0" , "name": vm.name,"description" : vm.description,"deviceId": vm.deviceId};
			moduleService.addModule(newModule).then ( function() {
				moduleService.getAllModules().then(function( moduleList) { 
					vm.modulesList = moduleList;
				});
			});
		}; 
		
		
		vm.deleteModule = function( moduleId )
		{
			moduleService.deleteModule(moduleId).then ( function() {
				moduleService.getAllModules().then(function( moduleList) { 
					vm.modulesList = moduleList;
				});
			});
		};

		vm.showAddDialog = function() {
			return $mdDialog.show({
				templateUrl: 'partials/moduleDialog.html',
				controller: 'moduleDialogController',
				controllerAs: 'vm',
				//targetEvent: ev,
				clickOutsideToClose: true,
				locals: {
					selectedModuleId : 0	
				}
			  });
		};
		vm.showUpdateDialog = function( moduleId ) {
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