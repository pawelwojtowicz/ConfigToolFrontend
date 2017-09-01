(function () {
'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.service("parameterService", ['$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
	var vm = this;
	vm.url = appConfig.getServiceUrl() + "/parameters";
	vm.parameters = [];

	vm.addParameter = function (newParameter ) {
		return $q(function( resolve, reject ){
			$http({	url: vm.url,
            		method: "POST",
            		data: newParameter,
            		headers: {'Content-Type': 'application/json'}}).then (
					function( response) {
						resolve();
					} , function ()
					{
						reject();
					});
				});
	};

	vm.deleteParameter = function( moduleId) {
		var urlForDeleting = vm.url + "/" + String(moduleId);
		return $http.delete(urlForDeleting);
	};


	
	vm.getAllParameters = function() {
		return $q( function(resolve, reject) {
			$http.get(vm.url).then( function( response) {
				resolve(response.data);
			},function(error) {
				reject();
			});
		});
	};
	
	vm.getParameterById = function( parameterId ) {
		return $q ( function( resolve, reject ) {
			var requestUrl = vm.url+'/'+parameterId;
			$http.get(requestUrl).then( function( response) {
				resolve(response.data);
			},function(error) {
				reject( error );
			});
		});
	};
}]);
}());