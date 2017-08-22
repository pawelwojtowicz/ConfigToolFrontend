(function () {
'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.service("moduleService", ['$http', 'appConfig', function($http,appConfig) {
	var vm = this;
	vm.modules = [];
	vm.url = "/modules";
	vm.moduleUpdateCallbacks = [];

	vm.addModule = function (newModule ) {
		$http({	url: vm.url,
            	method: "POST",
            	data: newModule,
            	headers: {'Content-Type': 'application/json'}
        	}).then( function( response) { vm.getAllModules(); } );
	};

	
	vm.getAllModules = function() {
		return $http.get(vm.url).then(function (response) {
                vm.notifyModuleList(response.data);
            });
	};	

		
	vm.deleteModule = function( moduleId) {
		var urlForDeleting = vm.url + "/" + String(moduleId);
		$http.delete(urlForDeleting).then( function(response) { vm.getAllModules();});
	};
	
	vm.notifyModuleList = function ( modules ) {
		var toBroadcast = modules;
		vm.moduleUpdateCallbacks.forEach( function( clbk ) {
			clbk(toBroadcast);
		});
	};

	vm.registerModuleListener = function( moduleListener) {
		vm.moduleUpdateCallbacks.push(moduleListener);
	};

}]);
}());