(function () {
'use strict';

var configurationApp = angular.module('configurationApp');


configurationApp.controller('templateEditController',['$routeParams',
                                                      'templateService',
                                                      'templateParameterService',
                                                      'parameterService',
                                                      'templateElementService',
                                                      'templateRestrictionService',
                                                      '$location',
                                                      '$mdDialog',
                                                        function( $routeParams, templateService ,templateParameterService,parameterService,templateElementService,templateRestrictionService,$location ,$mdDialog )
                                                        {
		var vm = this;
    vm.templateId = parseInt($routeParams.templateId);
    vm.name = "";
    vm.description = "";
    vm.ownerId = 0;
    vm.templateStatus = 0;
    vm.licensed = 0;
    vm.templateParameters = [];
    vm.templateElements = [];
    vm.templateDependencies =[];
    vm.templateRestrictions = [];

    //parameter handling
    vm.availableParameters = [];
    vm.selectedParameter = -1;
    vm.associatedParameters = [];
    vm.selectedAssociatedParameter = -1;

    // collection for restrictions and dependencies
    vm.allTemplates = [];
    vm.selectedRelationSubject = -1;
    vm.selectedRelationInstance = -1;

    templateService.getAllTemplates().then( function( allTemplates) {
      vm.allTemplates = allTemplates;
    });



    vm.templateDialogUpdate = function( templateInfo ) {
      console.log("templateInfo: "+ JSON.stringify(templateInfo));
      vm.templateId = templateInfo.templateId;
      vm.name = templateInfo.name;
      vm.description = templateInfo.description;
      vm.ownerId =templateInfo.ownerId;
      vm.templateStatus = templateInfo.templateStatus;
      vm.licensed = templateInfo.licensed;
      vm.templateParameters = templateInfo.templateParameters;
      vm.templateElements = templateInfo.templateElements;
      vm.templateRestrictions = templateInfo.templateRestrictions;
      vm.templateDependecies = templateInfo.templateDependecies;
    };

    if ( vm.templateId !== 0 ) {
      templateService.getTemplateById(vm.templateId).then( vm.templateDialogUpdate );
    }

    parameterService.getAllParameters().then(function(allParameters) {
      vm.availableParameters = allParameters;
    });



    vm.showAddTemplateParameterDialog = function( index ) {
      var editedValue = {};
      if ( index === -1) {
        editedValue.name = "";
        editedValue.value = "";
        editedValue.description = "";
        editedValue.OwnerId = 0;
        editedValue.templateId = vm.templateId;
        editedValue.templateParameterId = 0;
      }
      else
      {
        editedValue = vm.templateParameters[index];
      }

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
            console.log("jest update z chmury"+ JSON.stringify(result.editedValue));
            templateParameterService.addTemplateParameter(result.editedValue).then(function() {
              templateService.getTemplateById(vm.templateId).then( vm.templateDialogUpdate );  
            });
            //write to the server and request the templateEdit page refresh
          }
        });
    };

    vm.deleteTemplateParameter = function ( index ) {
      var templateParameter = vm.templateParameters[index];

      if ( templateParameter.templateParameterId === 0 ) {
        vm.templateParameters.splice(index,1);
      }
      else {
        templateParameterService.deleteTemplateParameter(templateParameter.templateParameterId).then(function() {
          templateService.getTemplateById(vm.templateId).then( vm.templateDialogUpdate );
        });
      }
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

      templateService.addTemplate(newTemplate).then(function() {
        $location.url('/templatepage');        
      });
    };

    vm.cancel = function() {
      $location.url('/templatepage');              
    };


//parameters handling
    vm.selectParameter = function( index) {
      vm.selectedParameter = index;
      vm.selectedAssociatedParameter = -1;   
    };

    vm.selectTemplateElement = function( index) {
      vm.selectedParameter = -1;
      vm.selectedAssociatedParameter = index;
    };

    vm.assignParameterToTemplate = function() {
      if (-1 !== vm.selectedParameter ) {
        $mdDialog.show({
          templateUrl: 'partials/addParamToTmpltDialog.html',
          controller: 'addParamToTmpltDialogController',
          controllerAs: 'vm',
          //targetEvent: ev,
          clickOutsideToClose: true,
          locals: {
            assignmentContext : { parameter: vm.availableParameters[vm.selectedParameter],
                                  templateParameters : vm.templateParameters
                                }
          }
          }).then( function(result) {
            var templateElement = {
              templateId : vm.templateId,
              templateParameterId : result.templateParameterId,
              parameterId : result.parameterId
            };

            templateElementService.addTemplateElement(templateElement). then( function() {
              templateService.getTemplateById(vm.templateId).then( vm.templateDialogUpdate );
            });    
          });
          vm.selectedParameter = -1;
      }
    };

    vm.removeParameterToTemplateAssociation = function() {
      if ( -1 !== vm.selectedAssociatedParameter) {
        templateElementService.deleteTemplateElement(vm.templateElements[vm.selectedAssociatedParameter].templateId,
          vm.templateElements[vm.selectedAssociatedParameter].parameterId).then( function(){
          templateService.getTemplateById(vm.templateId).then( vm.templateDialogUpdate );
          vm.selectedAssociatedParameter = -1;
        });
      }

    };


    // code section for dependencies and restrictions
    vm.selectTemplateForRelation= function( index ) {
      vm.selectedRelationSubject = index;
      vm.selectedRelationInstance = -1;

    };

    vm.selectRelationInstanceForDeleting= function( index ) {
      vm.selectedRelationSubject = -1;
      vm.selectedRelationInstance = index;
    };

    vm.addRestriction = function() {
      if (-1 !== vm.selectedRelationSubject) {

        var restrictionObject = {
          templateId : vm.templateId,
          restrictedTemplateId : vm.allTemplates[vm.selectedRelationSubject].templateId 
        };

        templateRestrictionService.addRestriction(restrictionObject).then( function(){
          templateService.getTemplateById(vm.templateId).then( vm.templateDialogUpdate );
          vm.selectedRelationSubject = -1;  
        });
      }

      
    };

    vm.removeRestriction = function() {
      if ( -1 !== vm.selectedRelationInstance) {
        templateRestrictionService.deleteRestriction(vm.templateId,vm.templateRestrictions[vm.selectedRelationInstance].templateId).then( function(){
          templateService.getTemplateById(vm.templateId).then( vm.templateDialogUpdate );
          vm.selectedRelationSubject = -1;  
        });

      }
      
    };
	}]);
}());