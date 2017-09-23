(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('configurationGroupDialogController',['$routeParams','configurationGroupService', 'configurationService' ,'$location',function( $routeParams, configurationGroupService, configurationService , $location) {
        var vm = this;

        vm.configurationGroupId = parseInt($routeParams.configurationGroupId);
        vm.configGroup.name = "";
        vm.configGroup.description = "";
        vm.configGroup.configurations = [];

        vm.allConfigurations = [];
        vm.selectedConfigGroupConfig = -1;
        vm.selectedConfiguration = -1;

        vm.updateConfigurationGroup = function( configurationGroup) {
            vm.configGroup = configurationGroup;
        };

        configurationService.vm.getAllConfigurations().then( function( data ){
            vm.allConfigurations = data;
        });

        if ( 0 !== vm.configurationGroupId ) {
            configurationGroupService.vm.getConfigGroupById(vm.configurationGroupId).then( vm.updateConfigurationGroup);
        }

        vm.isValid = function() {
            return true;
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

        };

        vm.removeConfiguration = function() {
            
        };
    }]);
}());