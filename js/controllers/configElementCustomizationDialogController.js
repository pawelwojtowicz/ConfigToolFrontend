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
            vm.templateGenericFlag = 0;
            vm.configElementParameters = [];
            vm.genericTemplatePath = "";


            vm.buildParameterList = function( template ) {
                vm.templateName = template.name;
                vm.templateGenericFlag = 0;


                template.templateElements.forEach( function(templateElement){
                    if (templateElement.parameter.genericPath === 1 ){
                        vm.templateGenericFlag = 1;
                    }
                });

                template.templateParameters.forEach( function(templateParameter) {
                    var elementParameter = {
                        id: templateParameter.templateParameterId,
                        name : templateParameter.name,
                        value: templateParameter.value,
                        parameterType: templateParameter.parameterType,
                        description: templateParameter.description
                    };
                    vm.configElementParameters.push(elementParameter);                  
                });

                console.log(JSON.stringify(vm.configElementParameters));
                

            };

            console.log("tutaj jestem, ale idziej nie");
            if (vm.configurationElementId !== 0) {
                configurationElementService.getConfigurationElementById(vm.configurationElementId).then( function(configurationElement){
                    console.log(JSON.stringify(configurationElement));
                    configurationElement.configurationElementParameters.forEach(function (configElementParameter){
                        console.log(JSON.stringify(configElementParameter));
                        var elementParameter = {
                            id: configElementParameter.templateParameter.templateParameterId,
                            name : configElementParameter.templateParameter.name,
                            value: configElementParameter.templateParameter.value,
                            parameterType: configElementParameter.templateParameter.parameterType,
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


                configurationElementService.saveConfigurationElement(configurationElement).then( function() {
                    $mdDialog.hide();
                });
                
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };

            vm.getIconForParamType = function(templateParameterType) {
              if ( 1 === templateParameterType) {
                return String( "/assets/const.svg" );
              } else if ( 2 === templateParameterType) {
                return String( "/assets/allowed.svg" );
              }
              return String( "/assets/required.svg" );        
            };
          

        }]);
    }());