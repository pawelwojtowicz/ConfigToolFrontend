(function () {
'use strict';

var configurationApp = angular.module('configurationApp');

/**
configurationApp.controller('templateDialogController',['$scope',
                                                        'templateService',
                                                        'templateDependencyService',
                                                        'templateRestrictionService',
                                                        function( $scope , templateService , templateDependencyService, templateRestrictionService)
                                                        **/
configurationApp.controller('templateDialogController',['templateService',
                                                        function(  templateService )
                                                        {
		var vm = this;
    vm.templateId = 0;
		vm.templateName = "";
		vm.templateDescription = "";
    vm.templateOwnerId = 0;
    vm.templateStatus = 0;
		vm.templateLicensedFlag = false;
    vm.templateList = [];
    vm.templateDependencies = [];
    vm.templateRestrictions = [];
    
    vm.notifyTemplateListChanged = function ( templates ) {
      vm.templateList = templates;
    };

    vm.notifyTemplateDependenciesListChanged = function ( dependencies ) {
      vm.templateDependencies = dependencies;
    };
    
    vm.notifyTemplateRestrictionListChanged = function ( restrictions ) {
      vm.templateRestrictions = restrictions;
    };
    
    templateService.registerTemplateListListener( vm.notifyTemplateListChanged );
    templateService.getAllTemplates();
     
    
		vm.addNewTemplate = function() {
    
      var newTemplate = { "templateId":     vm.templateId ,
                          "name":           vm.templateName,
                          "description":    vm.templateDescription,
                          "ownerId":        vm.templateOwnerId,
                          "templateStatus": vm.templateStatus,
                          "licensed":       vm.templateLicensed};
			templateService.addTemplate(newTemplate);
		}; 
		
		
		vm.deleteModule = function( moduleId ) {
			templateService.deleteModule(moduleId);
		};
    
	}]);
}());