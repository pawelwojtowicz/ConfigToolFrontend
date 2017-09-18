(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('moduleDialogController',['selectedModuleId','moduleService', 'moduleConfigItemSetupService','configItemService','$mdDialog',function( selectedModuleId , moduleService ,moduleConfigItemSetupService,configItemService ,$mdDialog)
        {
            var vm = this;
            vm.dialogTitle = "Add module";
            vm.moduleId = selectedModuleId;
            vm.name = "";
            vm.description = "";
            vm.moduleConfigItems = [];
            vm.selectedModuleConfigItem = -1;
            vm.availableConfigItems = [];// [{configurationItemId: 10, name: "ConfigApp"}, {configurationItemId: 11, name: "DIO"},{configurationItemId: 12, name: "NetConfig"}];
            vm.selectedConfigItem = -1;

            configItemService.getAllConfigItems().then( function (configItems) {
                vm.availableConfigItems = configItems;
            });

            vm.updateModuleDetails = function (receivedModule ) {
                vm.name              = receivedModule.name;
                vm.description       = receivedModule.description;
                vm.moduleConfigItems = receivedModule.configItems;
            };

            if ( 0 != vm.moduleId) {
                vm.dialogTitle = "Modify module";
                moduleService.getModuleById( vm.moduleId ).then( vm.updateModuleDetails, function ( error ) {
                    vm.description = error.toString();
                });
            }
    
    
    
            vm.addNewModule = function() {
                var newModule = { "moduleId" : vm.moduleId , 
                                  "name": vm.name,
                                  "description" : vm.description,
                                  "configItems": vm.moduleConfigItems };
                moduleService.addModule(newModule).then ( function() {
                    $mdDialog.hide();
                });
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };

            vm.selectModulesConfigItem = function ( moduleConfigItemId ) {
                vm.selectedModuleConfigItem = moduleConfigItemId;
                vm.selectedConfigItem = -1;                
            };

            vm.selectConfigItem = function ( configItemId ) {
                vm.selectedModuleConfigItem = -1;
                vm.selectedConfigItem = configItemId;                
                
            };

            vm.removeConfigItem = function() {
                if (-1 !== vm.selectedModuleConfigItem) {
                    if ( 0 !== vm.moduleId) {
                        var setupEntity = { moduleId : vm.moduleId , configurationItemId : vm.moduleConfigItems[vm.selectedModuleConfigItem].configurationItemId};
                        moduleConfigItemSetupService.removeSetupEntity(setupEntity).then( function() {
                            moduleService.getModuleById( vm.moduleId ).then( vm.updateModuleDetails, function ( error ) {
                                vm.name = error.toString();
                                vm.description = "xxx";
                            });
                        });

                    }
                    else {
                        vm.moduleConfigItems.splice( vm.selectedModuleConfigItem , 1);
                    }

                    vm.selectedModuleConfigItem = -1;
                }

            };

            vm.addConfigItem = function() {
                if (-1 !== vm.selectedConfigItem) {
                    if ( 0 !== vm.moduleId ) {
                        var setupEntity = { moduleId : vm.moduleId , configurationItemId : vm.availableConfigItems[vm.selectedConfigItem].configurationItemId};
                        moduleConfigItemSetupService.addSetupEntity(setupEntity).then( function() {
                            moduleService.getModuleById( vm.moduleId ).then( vm.updateModuleDetails, function ( error ) {
                                vm.name = error.toString();
                                vm.description = "xxx";
                            });
                        });

                    }
                    else {
                        vm.moduleConfigItems.push( vm.availableConfigItems[vm.selectedConfigItem]);
                    }
                    vm.selectedConfigItem = -1;
                }
            };
               
        }]);
    }());