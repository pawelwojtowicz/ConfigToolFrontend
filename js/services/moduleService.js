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

		
	vm.deleteModule = function( moduleId) {
		var urlForDeleting = vm.url + "/" + String(moduleId);
		return $http.delete(urlForDeleting);
	};
	

}]);
}());