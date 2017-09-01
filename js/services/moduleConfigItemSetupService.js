(function () {
'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.service("moduleConfigItemSetupService", ['$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
	var vm = this;
	vm.url = appConfig.getServiceUrl() + "/moduleconfigitemsetup";

	vm.addSetupEntity = function (setupEntity ) {
		return $q(function( resolve, reject ){
			console.log("inside the service - ", JSON.stringify(setupEntity));
			var urlForRequest = vm.url + "/" + setupEntity.moduleId + "/" + setupEntity.configurationItemId;
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
			var urlForRequest = vm.url + "/" + setupEntity.moduleId + "/" + setupEntity.configurationItemId;
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