(function () {
'use strict';

var configurationApp = angular.module('configurationApp');

configurationApp.controller('templateController',['templateService', '$location',function( templateService ,$location)
	{
		var vm = this;

		vm.templateList = [];
	
		vm.notifyTemplateListChanged = function( templatesList) {
			vm.templateList = templatesList;
		};

		templateService.registerTemplateListListener(vm.notifyTemplateListChanged);
    templateService.getAllTemplates();
		
		vm.deleteTemplate = function( templateId )
		{
			templateService.deleteTemplate(templateId);
		};

		vm.addNewTemplate = function() {
			vm.showTemplateEditView(0);	
		};
    
		vm.updateTemplate = function( templateId ) {
			vm.showTemplateEditView(templateId);
		};

		vm.showTemplateEditView = function( templateId ) {
			$location.url("/templateedit/"+ templateId);	
		};

	}]);
}());