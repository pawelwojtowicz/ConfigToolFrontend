(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('configurationGroupDialogController',[  '$routeParams',
                                                                        'configGroupService', 
                                                                        'configurationService' ,
                                                                        'configGroupSetupService',
                                                                        '$location',function( $routeParams, configGroupService, configurationService , configGroupSetupService ,$location) {
        var vm = this;

        vm.configGroup = {};
        vm.configGroup.configurationGroupId = parseInt($routeParams.configurationGroupId);
        vm.configGroup.name = "";
        vm.configGroup.description = "";
        vm.configGroup.configurations = [];

        vm.allConfigurations = [];
        vm.selectedConfigGroupConfig = -1;
        vm.selectedConfiguration = -1;
 
        vm.updateConfigurationGroup = function( configurationGroup) {
            vm.configGroup = configurationGroup;
        };

        configurationService.getAllConfigurations().then( function( data ){
            vm.allConfigurations = data;
        });

        if ( 0 !== vm.configGroup.configurationGroupId ) {
            configGroupService.getConfigGroupById(vm.configGroup.configurationGroupId).then( vm.updateConfigurationGroup);
        }

        vm.isValid = function() {
            return ( 0 !== vm.configGroup.configurationGroupId );
        };

            vm.selectConfigGroupConfiguration = function( index ) {
            vm.selectedConfigGroupConfig = index;
            vm.selectedConfiguration = -1;
        };

        vm.selectConfiguration = function( index ) {
            vm.selectedConfigGroupConfig = -1;
            vm.selectedConfiguration = index;

        };

        vm.addConfiguration = function() {
            
            if (-1 !== vm.selectedConfiguration) {
                var configItemToAdd = vm.allConfigurations[vm.selectedConfiguration];
                console.log("atos pontos");                
                configGroupSetupService.addNewConfigGroupSetupItem(vm.configGroup.configurationGroupId, configItemToAdd.configurationId).then(function() {
                    console.log("kaka demona");
                    
                    configGroupService.getConfigGroupById(vm.configGroup.configurationGroupId).then( vm.updateConfigurationGroup);                    
                    
                });
                vm.selectedConfiguration = -1;
            }
        };

        vm.removeConfiguration = function() {
            if ( -1 !== vm.selectedConfigGroupConfig) {
                var configurationToDelete = vm.configGroup.configurations[vm.selectedConfigGroupConfig];
                configGroupSetupService.deleteConfigGroupSetupItem(vm.configGroup.configurationGroupId,configurationToDelete.configurationId).then(function() {
                    configGroupService.getConfigGroupById(vm.configGroup.configurationGroupId).then( vm.updateConfigurationGroup);                    
                });
                
                vm.selectedConfigGroupConfig = -1;
            }
        };

        vm.createConfigurationGroup = function() {
            configGroupService.addNewConfigGroup( vm.configGroup ).then ( function( savedConfigGroup ) {
                $location.url("/configurationgroupeditpage/"+ String(savedConfigGroup.configurationGroupId));
            });
        };

        vm.saveConfigurationGroup = function() {
            configGroupService.addNewConfigGroup( vm.configGroup ).then ( function( savedConfigGroup ) {
                $location.url("/configurationgrouppage");
            });            
        };

        vm.cancel = function() {
            $location.url("/configurationgrouppage");
        };
            
    }]);
}());