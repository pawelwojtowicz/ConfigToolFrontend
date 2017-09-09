
(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('configurationDialogController',[   '$routeParams',
                                                                    '$location',
                                                                    'configurationService',
                                                                    'templateService',
                                                                    '$mdDialog',
                                                                    function($routeParams, $location,configurationService,templateService ,$mdDialog)
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
                vm.configurationElements = configuration.configurationElements;
            };

            templateService.getAllTemplates().then(function( templateList ) {
                vm.templates = templateList;
            });

            if ( 0 !== vm.configurationId)
            {
                console.log("will be calling for " +String(vm.configurationId));
                configurationService.getConfigurationById(vm.configurationId).then(vm.configurationInfoUpdate);
            }

            vm.createConfiguration = function () {
                var configuration = {
                    configurationId: 0,
                    baselineId: 1,
                    name : vm.name,
                    description:vm.description,
                    customerId: 0
                };
                configurationService.saveConfiguration( configuration ).then( function ( item) {
                    console.log(JSON.stringify(item));
                    $location.url("/configurationdialog/"+ String(item.configurationId));
                });
            };

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

                    $mdDialog.show({
                        templateUrl: 'partials/configElementCustomizationDialog.html',
                        controller: 'configElementCustomizationDialogController',
                        controllerAs: 'vm',
                        //targetEvent: ev,
                        clickOutsideToClose: true,
                        locals: {
                            configElementEditContext : {
                                configurationId : vm.configurationId,
                                configurationElementId: 0,
                                templateId: vm.templates[vm.selectedTemplate].templateId
                            }
                        }
                    });
                    


                    
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

            vm.isValid = function() {
                return (vm.configurationId !== 0);
            };          
    
        }]);
    }());