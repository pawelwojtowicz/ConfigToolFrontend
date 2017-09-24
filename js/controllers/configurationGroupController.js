(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('configuationGroupController',['configGroupService','$location', function( configGroupService,$location )
        {
            var vm = this;
    
            vm.configGroupList = [];
    
            configGroupService.getAllConfigGroups().then(function( data) {
                console.log(JSON.stringify(data));
                vm.configGroupList = data;
            });
        
        
            vm.deleteConfigGroup = function( configGroupId )
            {
                configGroupService.deleteConfigGroup(configGroupId).then( function() {
                    configGroupService.getAllConfigGroups().then(function( data) {
                        vm.configGroupList = data;
                    });                            
                });
            };
    
            vm.addNewConfigGroup = function() {
                vm.showConfigGroupDialog(0);	
            };
        
            vm.updateConfigGroup = function( configGroupId ) {
                vm.showConfigGroupDialog(configGroupId);
            };
    
            vm.showConfigGroupDialog = function( configGroupId ) {
                $location.url("/configurationgroupeditpage/"+ String(configGroupId));	
            };
    
        }]);
    }());