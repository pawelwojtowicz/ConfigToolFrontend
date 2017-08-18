(function () {
'use strict';

var configurationApp = angular.module('configurationApp');

configurationApp.controller('moduleController',['$scope','moduleService', '$mdDialog',function( $scope , moduleService , $mdDialog)
	{
		var vm = this;
		vm.title = "This is sehr gute dialog";
		vm.name = "";
		vm.description = "";

		vm.modulesList = []
		
		vm.notifyModuleListChanged = function( moduleList) {
			vm.modulesList = moduleList;
		};

		moduleService.registerModuleListener(vm.notifyModuleListChanged);

		moduleService.getAllModules();

		vm.addNewModule = function() {
			var newModule = { "moduleId" : "100" , "name": vm.name,"description" : vm.description,"deviceId": "17"};
			moduleService.addModule(newModule);
		}; 
		
		
		vm.deleteModule = function( moduleId )
		{
			moduleService.deleteModule(moduleId);
		};

		vm.showDialog = function() {
			return $mdDialog.show({
				templateUrl: 'partials/moduleDialog.html',
				controller: function() { return vm;},
				controllerAs: 'vm',
				//targetEvent: ev,
				clickOutsideToClose: true
			  });
		};

	}]);
}());