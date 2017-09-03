(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('templateParameterDialogController',['itemIndex','templateParameter','$mdDialog',function( itemIndex,templateParameter,$mdDialog)
        {
            var vm = this;
            vm.itemIndex = itemIndex;
            vm.parameter = templateParameter;

            vm.saveParameter = function() {
                var result = {
                    itemIndex: vm.itemIndex,
                    editedValue : vm.parameter
                };       
                $mdDialog.hide(result);
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };
               
        }]);
    }());