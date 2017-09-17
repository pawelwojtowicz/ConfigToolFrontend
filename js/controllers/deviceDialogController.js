(function () {
'use strict';

var configurationApp = angular.module('configurationApp');

configurationApp.controller('deviceDialogController',['selectedDeviceId','deviceService', 'moduleService', 'deviceModuleSetupService' ,'$mdDialog',function(selectedDeviceId , deviceService , moduleService,deviceModuleSetupService ,$mdDialog)
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

		vm.updateDeviceInfo = function( deviceInfo ) {
			vm.deviceId = deviceInfo.deviceId;
			vm.name = deviceInfo.name;
			vm.description = deviceInfo.description;
			vm.deviceModules = deviceInfo.deviceModules;
		};


		moduleService.getAllModules().then(function( moduleList) { 
			vm.availableModules = moduleList;			
		});
		if ( 0!= vm.deviceId ) {
			vm.dialogTitle = "Modify Device";
			deviceService.getDeviceById(vm.deviceId).then( vm.updateDeviceInfo , function ( error ) {vm.description.toString();});		
		}
		
		vm.addNewDevice = function() {
			var newDevice = { 
							"deviceId" : vm.deviceId , 
							"name": vm.name,
							"description" : vm.description , 
							"deviceModules": vm.deviceModules
							};
			deviceService.addDevice(newDevice).then ( function() {
				$mdDialog.hide();
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

		vm.removeFromDeviceModules = function() {
			if (-1 !== vm.selectedDeviceModuleId) {
				if ( vm.deviceId !== 0) {
					var setupEntity = {
						deviceId : vm.deviceId,
						moduleId : vm.deviceModules[vm.selectedDeviceModuleId].moduleId
					};
					deviceModuleSetupService.removeSetupEntity(setupEntity).then( function() { 
						deviceService.getDeviceById(vm.deviceId).then( vm.updateDeviceInfo , function ( error ) {vm.description.toString();});	
					});
				}
				else {
					vm.deviceModules.splice(vm.selectedDeviceModuleId,1);
				}
				vm.selectedDeviceModuleId = -1;
			}
		};

		vm.addModulesToDevice = function() {
			if ( -1 !== vm.selectedAvailableModule) {
				if ( vm.deviceId !== 0) {
					var setupEntity = {
						deviceId : vm.deviceId,
						moduleId : vm.availableModules[vm.selectedAvailableModule].moduleId
					};
					deviceModuleSetupService.addSetupEntity(setupEntity).then( function() { 
						deviceService.getDeviceById(vm.deviceId).then( vm.updateDeviceInfo , function ( error ) {vm.description.toString();});	
					});					
				}
				else {
					vm.deviceModules.push( vm.availableModules[vm.selectedAvailableModule] );					
				}
				vm.selectedAvailableModule = -1;
			}
		};

	}]);
}());