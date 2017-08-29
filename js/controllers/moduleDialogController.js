(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('moduleDialogController',['selectedModuleId','moduleService','$mdDialog',function( selectedModuleId , moduleService ,$mdDialog)
        {
            var vm = this;
            vm.moduleId = selectedModuleId;
            vm.name = "";
            vm.description = "";

            if ( 0 != vm.moduleId) {
                moduleService.getModuleById( vm.moduleId ).then(function( receivedModule ){
                    vm.name = receivedModule.name;
                    vm.description = receivedModule.description;
                }, function ( error ) {
                    vm.name = error.toString();
                    vm.description = "xxx";
                });
            }
    
    
    
            vm.addNewModule = function() {
                var newModule = { "moduleId" : vm.moduleId , "name": vm.name,"description" : vm.description };
                moduleService.addModule(newModule).then ( function() {
                    $mdDialog.cancel();
                });
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };
               
        }]);
    }());