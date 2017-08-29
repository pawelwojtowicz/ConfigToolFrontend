(function () {
'use strict';

var configurationApp = angular.module('configurationApp');

configurationApp.controller('deviceController',['$scope','deviceService', '$mdDialog',function( $scope , deviceService , $mdDialog)
	{
		var vm = this;
		vm.name = "";
		vm.description = "";

		vm.deviceList = [];

		deviceService.getAllDevices().then(function( deviceList) { 
			vm.deviceList = deviceList;
		});

		vm.addNewDevice = function() {
			var newDevice = { "deviceId" : "0" , "name": vm.name,"description" : vm.description};
			deviceService.addDevice(newDevice).then ( function() {
				deviceService.getAllDevices().then(function( deviceList) { 
					vm.deviceList = deviceList;
				});
			});
		}; 
		
		
		vm.deleteDevice = function( deviceId )
		{
			deviceService.deleteDevice(deviceId).then ( function() {
				deviceService.getAllDevices().then(function( deviceList) { 
					vm.deviceList = deviceList;
				});
			});
		};

		vm.showDialog = function() {
			return $mdDialog.show({
				templateUrl: 'partials/deviceDialog.html',
				controller: 'deviceDialogController',
				controllerAs: 'vm',
				//targetEvent: ev,
				clickOutsideToClose: true,
				locals: {
					selectedDeviceId: 0
				}
			  });
		};

		vm.showUpdateDialog = function( deviceId ) {
			return $mdDialog.show({
				templateUrl: 'partials/deviceDialog.html',
				controller: 'deviceDialogController',
				controllerAs: 'vm',
				//targetEvent: ev,
				clickOutsideToClose: true,
				locals: {
					selectedDeviceId: deviceId
				}
			  });
		};
	}]);
}());