(function () {
'use strict';

var configurationApp = angular.module('configurationApp');

configurationApp.controller('moduleController',['$scope','moduleService','deviceService' ,'$mdDialog',function( $scope , moduleService ,deviceService ,$mdDialog)
	{
		var vm = this;
		vm.name = "";
		vm.description = "";
		vm.deviceId = "";

		vm.modulesList = [];
		vm.deviceList = [];

		deviceService.getAllDevices().then (function(deviceList) { 
			vm.deviceList = deviceList;
		});

		moduleService.getAllModules().then(function( moduleList) { 
			vm.modulesList = moduleList;
		});

		vm.findDeviceName = function ( deviceId )
		{
			var deviceName = "";
			
			vm.deviceList.forEach( function (deviceInfo) {
				if (deviceInfo.deviceId === deviceId ) {
					deviceName = deviceInfo.name;
				}
			});

			return deviceName;
		};

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

		vm.showDialog = function() {
			return $mdDialog.show({
				templateUrl: 'partials/moduleDialog.html',
				controller: function() { return vm;},
				controllerAs: 'vm',
				//targetEvent: ev,
				clickOutsideToClose: true
			  });
		};
		vm.showDialog2 = function() {
			return $mdDialog.show({
				templateUrl: 'partials/templateDialog.html',
				controller: function() { return vm;},
				controllerAs: 'vm',
				//targetEvent: ev,
				clickOutsideToClose: true
			  });
		};

	}]);
}());