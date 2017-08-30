(function () {
'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.service("deviceModuleSetupService", ['$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
	var vm = this;
	vm.url = appConfig.getServiceUrl() + "/devicemodulesetup";

	vm.addSetupEntity = function (setupEntity ) {
		return $q(function( resolve, reject ){
			var urlForRequest = vm.url + "/" + setupEntity.deviceId + "/" + setupEntity.moduleId;
			console.log("such url" + urlForRequest);
			$http({	url: urlForRequest,
            		method: "POST",
            		data: setupEntity,
            		headers: {'Content-Type': 'application/json'}}).then (
					function( response) {
						resolve();
					} , function ()
					{
						reject();
					});
				});
	};
	
	vm.removeSetupEntity = function (setupEntity ) {
		return $q(function( resolve, reject ){
			var urlForRequest = vm.url + "/" + setupEntity.deviceId + "/" + setupEntity.moduleId;
			console.log("such url" + urlForRequest);
			$http({	url: urlForRequest,
            		method: "DELETE",
            		data: setupEntity,
            		headers: {'Content-Type': 'application/json'}}).then (
					function( response) {
						resolve();
					} , function ()
					{
						reject();
					});
				});
	};
}]);
}());