(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('addParamToTmpltDialogController',['assignmentContext','$mdDialog',function( assignmentContext, $mdDialog)
        {
            var vm = this;
            vm.dialogTitle = "Add parameter";
            vm.parameter = assignmentContext.parameter;
            vm.templateParameters = assignmentContext.templateParameters;
            vm.selectedTemplateParameterId = {};

        
            vm.addTemplateElement = function() {

                var result = {
                    parameterId: vm.parameter.parameterId,
                    templateParameterId : vm.selectedTemplateParameterId 
                };

                $mdDialog.hide(result);
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };
        }]);
    }());