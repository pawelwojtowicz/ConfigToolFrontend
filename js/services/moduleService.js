(function () {
'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.service("moduleService", ['$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
	var vm = this;
	vm.url = appConfig.getServiceUrl() + "/modules";
	vm.moduleUpdateCallbacks = [];

	vm.addModule = function (newModule ) {
		return $q(function( resolve, reject ){
			$http({	url: vm.url,
            		method: "POST",
            		data: newModule,
            		headers: {'Content-Type': 'application/json'}}).then (
					function( response) {
						resolve();
					} , function ()
					{
						reject();
					});
				});
	};

	
	vm.getAllModules = function() {
		return $q( function(resolve, reject) {
			$http.get(vm.url).then( function( response) {
				resolve(response.data);
			},function(error) {
				reject();
			});
		});
	};
	
	vm.getModuleById = function( moduleId ) {
		return $q ( function( resolve, reject ) {
			var requestUrl = vm.url+'/'+moduleId;
			$http.get(requestUrl).then( function( response) {
				resolve(response.data);
			},function(error) {
				reject( error );
			});
		});
	};

		
	vm.deleteModule = function( moduleId) {
		var urlForDeleting = vm.url + "/" + String(moduleId);
		return $http.delete(urlForDeleting);
	};
	

}]);
}());