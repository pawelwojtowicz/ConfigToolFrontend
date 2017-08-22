(function () {
'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.service('templateService', [ '$http', function($http) {
	var vm = this;


	vm.templates = [];
	vm.templateListUpdateCallbacks = [];

	vm.addTemplate = function ( newTemplate ) {
		vm.templates.push(newTemplate);
		vm.notifyTemplateList(vm.templates);
	};

	
	vm.getAllTemplates = function() {
		vm.notifyTemplateList(vm.templates);
	};	

		
	vm.deleteTemplate = function( templateId) {
	//	vm.templates = vm.templates.filter( item => item.templateId != templateId);
		vm.notifyTemplateList(vm.templates);
	};
	
	vm.notifyTemplateList = function ( templates ) {
		var toBroadcast = templates;
		vm.templateListUpdateCallbacks.forEach( function( clbk ) {
			clbk(toBroadcast);
		});
	};

	vm.registerTemplateListListener = function( templateListener) {
		vm.templateListUpdateCallbacks.push(templateListener);
	};

}]);
}());