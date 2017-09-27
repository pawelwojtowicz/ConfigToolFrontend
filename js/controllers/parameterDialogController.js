(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('parameterDialogController',['selectedParameterId',
                                                             'parameterService', 
                                                             'configItemService', 
                                                             '$mdDialog',
                                                             function(selectedParameterId , parameterService , configItemService ,$mdDialog)
        {
            var vm=this;
            vm.dialogTitle = "Add Parameter";
            vm.parameterId = selectedParameterId;
            vm.name = "tmp";
            vm.type = "typ parametru";
            vm.value = "wartosc";
            vm.unit = "jednostka";
            vm.path = "sciezka";
            vm.description = "this is a description";
            vm.configItem = {};
            vm.configurationItemId = 0;
            vm.availableConfigItems =[];

            configItemService.getAllConfigItems().then( function (configItems) {
                vm.availableConfigItems = configItems;
            });

            vm.updateDialogItems = function( parameter ) {
                vm.parameterId = parameter.parameterId; 
                vm.name = parameter.name;
                vm.type = parameter.type;                    
                vm.value = parameter.value;
                vm.unit = parameter.unit;
                vm.path = parameter.path;
                vm.configurationItemId = parameter.configurationItemId;
                vm.description = parameter.description;
                vm.configItem = parameter.configurationItem;                
            };

            if ( 0!== vm.parameterId) {
                vm.dialogTitle = "Modify Parameter";
                parameterService.getParameterById(vm.parameterId).then( vm.updateDialogItems , function ( error ) {vm.description.toString();});		   
            }


            vm.addNewParameter = function () {
                var newParameter = { 
                    "parameterId" : vm.parameterId , 
                    "name": vm.name,
                    "type" : vm.type ,                    
                    "value": vm.value,
                    "unit": vm.unit,
                    "path": vm.path,
                    "description": vm.description,
                    "configurationItemId": vm.configurationItemId
                };
                parameterService.addParameter(newParameter).then ( function() {
                    $mdDialog.hide();
                });
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };
        }
    ]);
}());