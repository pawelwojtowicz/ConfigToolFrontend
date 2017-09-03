(function () {
'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.service('templateService', [ '$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
	var vm = this;
	vm.url = appConfig.getServiceUrl() + "/template";

	vm.addTemplate = function ( newTemplate ) {
		console.log(JSON.stringify(newTemplate));
		return $q(function( resolve, reject ){
			$http({	url: vm.url,
            		method: "POST",
            		data: newTemplate,
            		headers: {'Content-Type': 'application/json'}}).then (
					function( response) {
						resolve();
					} , function ()
					{
						reject();
					});
				});
	};

	
	vm.getAllTemplates = function() {
		return $q( function(resolve, reject) {
			$http.get(vm.url).then( function( response) {
				console.log(JSON.stringify(response.data));
				resolve(response.data);
			},function(error) {
				reject();
			});
		});
	};

	vm.getTemplateById = function( templateId) {
		return $q ( function( resolve, reject ) {
			var requestUrl = vm.url+'/'+templateId;
			$http.get(requestUrl).then( function( response) {
				resolve(response.data);
			},function(error) {
				reject( error );
			});
		});
	};

		
	vm.deleteTemplate = function( templateId ) {
		var urlForDeleting = vm.url + "/" + String(templateId);
		return $http.delete(urlForDeleting);
	};	
}]);
}());