(function () {
'use strict';

var configurationApp = angular.module('configurationApp');


configurationApp.controller('templateEditController',['$routeParams','templateService',
                                                        function( $routeParams, templateService )
                                                        {
		var vm = this;
    vm.templateId = $routeParams.templateId;
    vm.name = "";
    vm.description = "";
    vm.ownerId = 0;
    vm.templateStatus = 0;
    vm.licensed = 0;
    vm.templateParameters = [ {name: "Pawel", secondName: "Wojtowicz", duda : "dka;lsda"},
    {name: "Pawel", secondName: "Wojtowicz", duda : "dka;lsda"},
    {name: "Pawel", secondName: "Wojtowicz", duda : "dka;lsda"},
    {name: "Pawel", secondName: "Wojtowicz", duda : "dka;lsda"},
    {name: "Pawel", secondName: "Wojtowicz", duda : "dka;lsda"},
    {name: "Pawel", secondName: "Wojtowicz", duda : "dka;lsda"},
    {name: "Pawel", secondName: "Wojtowicz", duda : "dka;lsda"},
    {name: "Pawel", secondName: "Wojtowicz", duda : "dka;lsda"},
    {name: "Pawel", secondName: "Wojtowicz", duda : "dka;lsda"},
    {name: "Pawel", secondName: "Wojtowicz", duda : "dka;lsda"},
    {name: "Pawel", secondName: "Wojtowicz", duda : "dka;lsda"}];
    
	}]);
}());