(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('configItemController',['configItemService' ,'$mdDialog',function( configItemService ,$mdDialog)
        {
            var vm = this;   
            vm.configItemList = [];

            configItemService.getAllConfigItems().then( function (configItems) {
                vm.configItemList = configItems;
            });
                        
            vm.deleteConfigItem = function( configItemId )
            {
                configItemService.deleteConfigItem(configItemId).then ( function() {
                    configItemService.getAllConfigItems().then(function( configItemList) { 
                        vm.configItemList = configItemList;
                    });
                });
            };
    
            vm.showAddDialog = function() {
                return $mdDialog.show({
                    templateUrl: 'partials/configItemDialog.html',
                    controller: 'configItemDialogController',
                    controllerAs: 'vm',
                    //targetEvent: ev,
                    clickOutsideToClose: true,
                    locals: {
                        selectedConfigItemId : 0	
                    }
                  });
            };
            vm.showUpdateDialog = function( id ) {
                return $mdDialog.show({
                    templateUrl: 'partials/configItemDialog.html',
                    controller: 'configItemDialogController',
                    controllerAs: 'vm',
                    //targetEvent: ev,
                    clickOutsideToClose: true,
                    locals: {
                        selectedConfigItemId: id
                    }
                  });
            };
    
        }]);
    }());