(function () {
'use strict';

var configurationApp = angular.module('configurationApp');

configurationApp.controller('templateController',['templateService', '$location',function( templateService ,$location)
	{
		var vm = this;

		vm.templateList = [];

		templateService.getAllTemplates().then(function( data) {
			vm.templateList = data;
		});
	
	
		vm.deleteTemplate = function( templateId )
		{
			templateService.deleteTemplate(templateId).then ( function() {
				templateService.getAllTemplates().then ( function( templates) {
					vm.templateList = templates;
				});
			});
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