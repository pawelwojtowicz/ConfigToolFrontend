(function () {
'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.service("appConfig", [function() {

    var vm =this;
    
    vm.ip = "127.0.0.1";
    vm.port = "8080";
	
	this.getServiceUrl = function() {
		return "http://"+vm.ip+":"+vm.port;
	};	

}]);
}());