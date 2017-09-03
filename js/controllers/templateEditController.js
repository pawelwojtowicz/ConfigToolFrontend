(function () {
'use strict';

var configurationApp = angular.module('configurationApp');


configurationApp.controller('templateEditController',['$routeParams','templateService','$mdDialog',
                                                        function( $routeParams, templateService , $mdDialog )
                                                        {
		var vm = this;
    vm.templateId = $routeParams.templateId;
    vm.name = "";
    vm.description = "";
    vm.ownerId = 0;
    vm.templateStatus = 0;
    vm.licensed = 0;
    vm.templateParameters = [];

    console.log("najprzed" + JSON.stringify(vm.templateParameters));
    

    vm.templateDialogUpdate = function( templateInfo ) {
      vm.templateId = templateInfo.templateId;
      vm.name = templateInfo.name;
      vm.description = templateInfo.description;
      vm.ownerId =templateInfo.ownerId;
      vm.templateStatus = templateInfo.templateStatus;
      vm.licensed = templateInfo.licensed;
      vm.templateParameters = templateInfo.templateParameters;
    };

    if (vm.templateId !== "0") {
      console.log("czy to jest wolane ????"+ vm.templateId);
      templateService.getTemplateById(vm.templateId).then( vm.templateDialogUpdate );
    }

    vm.showAddTemplateParameterDialog = function( index ) {

      var editedValue = {};
      if ( index === -1) {
        editedValue.vame = "";
        editedValue.value = "";
        editedValue.description = "";
        editedValue.OwnerId = 0;
        editedValue.templateId = 0;
        editedValue.templateParameterId = 0;
      }
      else
      {
        editedValue = vm.templateParameters[index];
      }

      console.log("przed" + JSON.stringify(vm.templateParameters));
      $mdDialog.show({
				templateUrl: 'partials/templateParameterDialog.html',
				controller: 'templateParameterDialogController',
				controllerAs: 'vm',
				//targetEvent: ev,
				clickOutsideToClose: true,
				locals: {
          itemIndex : index,
					templateParameter : editedValue	
				}
			  }).then( function(result) {
          if (result.editedValue.templateId === 0) {
              console.log("po" + JSON.stringify(vm.templateParameters));
            
              if ( result.itemIndex === -1) {
                vm.templateParameters.push(result.editedValue);  
              }
              else {
                vm.templateParameters[reslt.itemIndex] = result.editedValue;
              }
          }
          else {
            //write to the server and request the templateEdit page refresh
          }
        });
    };

    vm.addNewTemplate = function() {
      var newTemplate = {
        "templateId" : vm.templateId,
        "name" : vm.name,
        "description" :vm.description,
        "ownerId" : vm.ownerId,
        "templateStatus" : vm.templateStatus,
        "licensed": vm.licensed,
        "templateParameters": vm.templateParameters
      };

      templateService.addTemplate(newTemplate);
    };
	}]);
}());