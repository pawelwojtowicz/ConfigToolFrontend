(function () {
'use strict';

var configurationApp = angular.module('configurationApp');

configurationApp.controller('deviceDialogController',['selectedDeviceId','deviceService', 'moduleService' ,'$mdDialog',function(selectedDeviceId , deviceService , moduleService ,$mdDialog)
	{
		var vm = this;
		vm.dialogTitle = "Add Device";
		vm.deviceId = selectedDeviceId;
		vm.name = "";
		vm.description = "";
		vm.selectedDeviceModuleId = -1;
		vm.deviceModules = [];

		vm.selectedAvailableModule = -1;
		vm.availableModules = [];

		moduleService.getAllModules().then(function( moduleList) { 
			vm.availableModules = moduleList;
		});

		if ( 0!= vm.deviceId ) {
			vm.dialogTitle = "Modify Device";
			deviceService.getDeviceById(vm.deviceId).then( function( deviceInfo ) {
				vm.deviceId = deviceInfo.deviceId;
				vm.name = deviceInfo.name;
				vm.description = deviceInfo.description;
				vm.deviceModules = deviceInfo.deviceModules;
			}, function ( error ) {vm.description.toString();});		
		}


		vm.addNewDevice = function() {
			var newDevice = { "deviceId" : vm.deviceId , "name": vm.name,"description" : vm.description};
			deviceService.addDevice(newDevice).then ( function() {
				$mdDialog.cancel();
			});
		};

		vm.cancel = function() {
			$mdDialog.cancel();
		};

		vm.selectAvailableModule = function( elementIdx ) {
			vm.selectedAvailableModule = elementIdx;
			vm.selectedDeviceModuleId = -1;
		};

		vm.selectDeviceModule = function( elementIdx ) {
			vm.selectedAvailableModule = -1 ;
			vm.selectedDeviceModuleId = elementIdx;
		};

		vm.removeFronDeviceModules = function() {
			vm.deviceModules.splice(vm.selectedDeviceModuleId,1);
			vm.selectedDeviceModuleId = -1;
		};

		vm.addModulesToDevice = function() {
			vm.deviceModules.push( vm.availableModules[vm.selectedAvailableModule] );
			vm.selectedAvailableModule = -1;
		};

	}]);
}());