(function () {
'use strict';

var configurationApp = angular.module('configurationApp');

configurationApp.controller('templateController',['templateService', '$mdDialog',function( templateService ,$mdDialog)
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
    
			return $mdDialog.show({
				templateUrl: 'partials/templateDialog.html',
				controller: 'templateDialogController',
				controllerAs: 'vm',
				//targetEvent: ev,
				clickOutsideToClose: true,
        locals: {
          selectedTemplateId : 0
        }
			  });
		};
    
		vm.updateTemplate = function( templateId ) {
			return $mdDialog.show({
				templateUrl: 'partials/templateDialog.html',
				controller: 'templateDialogController',
				controllerAs: 'vm',
				//targetEvent: ev,
				clickOutsideToClose: true,
        locals: {
          selectedTemplateId : templateId}
			  });
		};

	}]);
}());