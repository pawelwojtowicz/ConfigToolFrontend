(function () {
'use strict';

var configurationApp = angular.module('configurationApp');

configurationApp.controller('parameterController',['parameterService','$mdDialog',function( parameterService,$mdDialog)
	{
		var vm = this;
		vm.parameters =[];

		parameterService.getAllParameters().then(function( parameterList ) { 
			vm.parameters = parameterList;
		});
		
		
		vm.deleteParameter = function( parameterId )
		{
			parameterService.deleteParameter(parameterId).then ( function() {
				parameterService.getAllParameters().then(function( parameterList ) { 
					vm.parameters = parameterList;
				});
			});
		};

		vm.showAddDialog = function() {
			vm.showEditParameterDialog(0).then( function() {
				parameterService.getAllParameters().then(function( parameterList ) { 
					vm.parameters = parameterList;
				});				
			});
		};
		vm.showUpdateDialog = function( parameterId ) {
			vm.showEditParameterDialog(parameterId).then( function() {
				parameterService.getAllParameters().then(function( parameterList ) { 
					vm.parameters = parameterList;
				});				
			});	
		};

		vm.showEditParameterDialog = function( parameterId ) {
			return $mdDialog.show({
				templateUrl: 'partials/parameterDialog.html',
				controller: 'parameterDialogController',
				controllerAs: 'vm',
				//targetEvent: ev,
				clickOutsideToClose: true,
				locals: {
					selectedParameterId: parameterId
				}
			});
		};

	}]);
}());