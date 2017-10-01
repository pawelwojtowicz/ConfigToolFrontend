(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('configItemDialogController',['selectedConfigItemId','configItemService','$mdDialog',function( selectedConfigItemId , configItemService ,$mdDialog)
        {
            var vm = this;
            vm.dialogTitle = "Add Configuration Item";
            vm.configurationItemId = selectedConfigItemId;
            
            vm.name = "";
            vm.description = "";
            vm.exportType = "";
            vm.fileName = "";
            vm.defaultBase = 0;

            if ( 0 != vm.configurationItemId) {
                vm.dialogTitle = "Modify Configuration Item";

                configItemService.getConfigItemById( vm.configurationItemId ).then(function( receivedConfigItem ){
                    vm.name = receivedConfigItem.name;
                    vm.description = receivedConfigItem.description;
                    vm.exportType = receivedConfigItem.exportType;
                    vm.fileName = receivedConfigItem.fileName;
                    vm.defaultBase = receivedConfigItem.defaultBase;
                }, function ( error ) {
                    vm.name = error.toString();
                    vm.description = "xxx";
                });
            }
    
    
            vm.addNewConfigItem = function() {
                var newConfigItem = { configurationItemId : vm.configurationItemId,
                                         name: vm.name,
                                         description: vm.description,
                                         exportType : vm.exportType,
                                         fileName: vm.fileName,
                                         defaultBase: vm.defaultBase };
                configItemService.addNewConfigItem(newConfigItem).then ( function() {
                    $mdDialog.hide();
                });
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };
               
        }]);
    }());