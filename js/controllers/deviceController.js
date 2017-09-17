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

		
		vm.deleteDevice = function( deviceId )
		{
			deviceService.deleteDevice(deviceId).then ( function() {
				deviceService.getAllDevices().then(function( deviceList) { 
					vm.deviceList = deviceList;
				});
			});
		};

		vm.showDialog = function() {
			vm.showEditDeviceDialog(0).then( function() {
				deviceService.getAllDevices().then(function( deviceList) { 
					vm.deviceList = deviceList;				
				});
			});
		};

		vm.showUpdateDialog = function( deviceId ) {
			vm.showEditDeviceDialog(deviceId).then( function() {
				deviceService.getAllDevices().then(function( deviceList) { 
					vm.deviceList = deviceList;				
				});
			});
		};

		vm.showEditDeviceDialog = function( deviceId) {
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