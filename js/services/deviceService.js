(function () {
'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.service("deviceService", ['$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
	var vm = this;
	vm.url = appConfig.getServiceUrl() + "/devices";

	vm.addDevice = function (newDevice ) {
		return $q(function( resolve, reject ){
			$http({	url: vm.url,
            		method: "POST",
            		data: newDevice,
            		headers: {'Content-Type': 'application/json'}}).then (
					function( response) {
						resolve();
					} , function ()
					{
						reject();
					});
				});
	};

	
	vm.getAllDevices = function() {
		return $q( function(resolve, reject) {
			$http.get(vm.url).then( function( response) {
				resolve(response.data);
			},function(error) {
				reject();
			});
		});
	};	

		
	vm.deleteDevice = function( deviceId) {
		var urlForDeleting = vm.url + "/" + String(deviceId);
		return $http.delete(urlForDeleting);
	};
	

}]);
}());