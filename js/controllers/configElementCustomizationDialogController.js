(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('configElementCustomizationDialogController',['templateService','configElementEditContext','$mdDialog',function(templateService,configElementEditContext,$mdDialog)
        {
            var vm = this;
            vm.configurationElementId = configElementEditContext.configurationElementId;
            vm.templateId = configElementEditContext.templateId;
            vm.templateName = "";
            vm.configElementParameters = [];
            

            vm.buildParameterList = function( template ) {
                vm.templateName = template.name;
                template.templateParameters.forEach( function(templateParameter) {
                    var elementParameter = {
                        id: templateParameter.templateParameterId,
                        name : templateParameter.name,
                        value: templateParameter.value,
                        description: templateParameter.description
                    };
                    vm.configElementParameters.push(elementParameter);                  
                });

            };

            if ( vm.templateId !== 0 ) {
                templateService.getTemplateById(vm.templateId).then( vm.buildParameterList );
            }

            vm.addTemplateToConfiguration = function() {
                $mdDialog.hide();
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };

        }]);
    }());