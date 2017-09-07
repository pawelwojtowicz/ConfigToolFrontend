
(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('configurationDialogController',[   '$routeParams',
                                                                    'configurationService',
                                                                    'templateService',
                                                                    '$mdDialog',
                                                                    function($routeParams, configurationService,templateService ,$mdDialog)
        {
            var vm = this;
            vm.configurationId = parseInt($routeParams.configurationId);
            vm.name = "";
            vm.description = "";
            vm.configurationElements = [{name : "Tomek"}, {name : "Tomek1"}, {name : "Tomek2"}, {name : "Tomek3"}];
            vm.templates = [{name : "Tomek"}, {name : "Tomek1"}, {name : "Tomek2"}, {name : "Tomek3"}];

            vm.selectedConfigurationElement = -1;
            vm.selectedTemplate = -1;

            vm.configurationInfoUpdate = function( configuration) {
                vm.name = configuration.name;
                vm.description = configuration.description;
                vm.templateElements = configuration.configurationElements;
            };

            templateService.getAllTemplates().then(function( templateList ) {
                vm.templates = templateList;
            });

            if ( 0 !== vm.configurationId)
            {
                configurationService.getConfigurationById(vm.configurationId).then(vm.configurationInfoUpdate);
            }

            vm.saveConfiguration = function() {
                // here save the configuration into the backend.
            };

            vm.cancel =  function() {
                $mdDialog.cancel();
            };


            vm.selectConfigurationElement = function( index) {
                vm.selectedConfigurationElement = index;
                vm.selectedTemplate = -1;                
            };

            vm.selectTemplate = function(index) {
                vm.selectedConfigurationElement = -1;
                vm.selectedTemplate = index;                
            };

            vm.addConfigurationElement = function() {
                if (-1 !==vm.selectedTemplate) {
                    // add the dialog,which forces the input of the template parameters;
                    // store the DB


                    
                    vm.selectedTemplate = -1;
                }
            };

            vm.removeConfigurationElement = function() {
                if (-1 !== vm.selectedConfigurationElement)
                {
                    //remove the entry of the configuration element from the DB and force the reload

                    vm.selectedConfigurationElement = -1;
                }
            };
            
    
        }]);
    }());