(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('configElementCustomizationDialogController',[
                                                                                'templateService',
                                                                                'configElementEditContext',
                                                                                'configurationElementService',
                                                                                '$mdDialog',function(templateService,configElementEditContext,configurationElementService,$mdDialog)
        {
            var vm = this;
            vm.parentConfigurationId = configElementEditContext.configurationId;
            vm.configurationElementId = configElementEditContext.configurationElementId;
            vm.templateId = configElementEditContext.templateId;
            vm.templateName = "";
            vm.configElementParameters = [];
            vm.genericTemplatePath = "";
            

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

            if (vm.configurationElementId !== 0) {
                console.log("refresh the new element");
                configurationElementService.getConfigurationElementById(vm.configurationElementId).then( function(configurationElement){
                    console.log(JSON.stringify(configurationElement));
                    configurationElement.configurationElementParameters.forEach(function (configElementParameter){
                        var elementParameter = {
                            id: configElementParameter.templateParameter.templateParameterId,
                            name : configElementParameter.templateParameter.name,
                            value: configElementParameter.templateParameter.value,
                            description: configElementParameter.templateParameter.description
                        };
                        
                        vm.configElementParameters.push(elementParameter);
                    });
                                        
                });
            }

            if ( vm.templateId !== 0 ) {
                templateService.getTemplateById(vm.templateId).then( vm.buildParameterList );
            }

            vm.addTemplateToConfiguration = function() {
                var configurationElement = {
                    configurationElementId : vm.configurationElementId,
                    baselineId : 1,
                    parentConfigurationId: vm.parentConfigurationId,
                    templateId: vm.templateId,
                    genericTemplatePath: vm.genericTemplatePath,
                    configurationElementParameters: []
                };

                vm.configElementParameters.forEach ( function(configElementParameter) {
                    var dbConfigElementParam = {
                        configurationElementId : vm.configurationElementId,
                        templateParameterId: configElementParameter.id,
                        baselineId: 1,
                        templateParameterValue: configElementParameter.value
                    };

                    configurationElement.configurationElementParameters.push( dbConfigElementParam);
                });

                console.log(JSON.stringify(configurationElement));

                configurationElementService.saveConfigurationElement(configurationElement).then( function() {
                    $mdDialog.hide();
                });
                
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };

        }]);
    }());