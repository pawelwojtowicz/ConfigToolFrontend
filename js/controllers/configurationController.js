(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('configurationController',['configurationService','$location', '$mdDialog',function( configurationService , $location ,$mdDialog)
        {
            var vm = this;
            vm.configurationList = [];

            vm.updateConfigurationList = function( configList) {
                vm.configList = configList;
            };

            configurationService.getAllConfigurations().then(vm.updateConfigurationList);

            vm.addNewConfiguration = function() {
                vm.showConfigurationDialog(0);     
            };

            vm.updateConfiguration = function(index) {
                vm.showConfigurationDialog(index);
            };

            vm.deleteConfiguration = function( index ) {
                configurationService.deleteConfiguration(index).then (function() {
                    configurationService.getAllConfigurations().then(vm.updateConfigurationList);                                                
                });
            };

            vm.showConfigurationDialog = function( index ) {
                $location.url("/configurationdialog/"+ String(index));    
            };

        }]);
    }());