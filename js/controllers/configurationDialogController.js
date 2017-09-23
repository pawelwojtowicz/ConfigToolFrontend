
(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('configurationDialogController',[   '$routeParams',
                                                                    '$location',
                                                                    'configurationService',
                                                                    'configurationElementService',
                                                                    'templateService',
                                                                    '$mdDialog',
                                                                    function($routeParams, $location,configurationService,configurationElementService,templateService ,$mdDialog)
        {
            var vm = this;
            vm.configurationId = parseInt($routeParams.configurationId);
            vm.name = "";
            vm.description = "";
            vm.configurationElements = [];
            vm.templates = [];

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
                    $location.url("/configurationdialog/"+ String(item.configurationId));
                });
            };

            vm.saveConfiguration = function() {
                var configuration = {
                    configurationId: vm.configurationId,
                    baselineId: 1,
                    name : vm.name,
                    description:vm.description,
                    customerId: 0
                };
                configurationService.saveConfiguration( configuration ).then( function ( item) {
                    $location.url("/configurationpage");
                });            };

            vm.cancel =  function() {
                $location.url("/configurationpage");
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
                    }).then(function(){
                        configurationService.getConfigurationById(vm.configurationId).then(vm.configurationInfoUpdate);                        
                    });
                    


                    
                    vm.selectedTemplate = -1;
                }
            };

            vm.removeConfigurationElement = function() {
                if (-1 !== vm.selectedConfigurationElement)
                {

                    var configurationElementIdForDeleting = vm.configurationElements[vm.selectedConfigurationElement].configurationElementId;

                    configurationElementService.deleteConfigurationElement(configurationElementIdForDeleting).then(function(){
                        configurationService.getConfigurationById(vm.configurationId).then(vm.configurationInfoUpdate);                        
                    });

                    vm.selectedConfigurationElement = -1;
                }
            };

            vm.isValid = function() {
                return (vm.configurationId !== 0);
            };          
    
        }]);
    }());