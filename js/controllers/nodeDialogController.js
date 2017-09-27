(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.controller('nodeDialogController',['selectedNodeId',
                                                        'nodeService', 
                                                        'configGroupService',
                                                        'deviceService',
                                                        '$mdDialog',
                                                        '$mdToast',
                                                        function(selectedNodeId , nodeService , configGroupService,deviceService ,$mdDialog,$mdToast)
        {
            var vm=this;
            if ("" === selectedNodeId ) {
                vm.dialogTitle = "Add new Vehicle";
                vm.addNew = true;
            } else {
                vm.dialogTitle = "Modify Vehicle Setup";
                vm.addNew = false;
            }        
            vm.node = {};
            vm.node.nodeStringId = selectedNodeId;
            vm.node.description = "";
            vm.node.configurationGroupId = 0;
            vm.node.deviceId = 0;

            vm.availableConfigGroups = [];

            vm.devices = [];

            deviceService.getAllDevices().then( function(loadedDevices)  {
                vm.devices = loadedDevices;
            });

            configGroupService.getAllConfigGroups().then ( function( configGroups) {
                vm.availableConfigGroups = configGroups;
            });

            if (!vm.addNew) {
                nodeService.getNodeById(vm.node.nodeStringId).then(function( nodeInfo) {
                    vm.node = nodeInfo;
                });
            } 

            vm.saveNode = function () {
                if (vm.addNew) {
                    nodeService.addNode(vm.node).then ( function(data ) {
                        console.log("Add"+JSON.stringify(data));                        
                        if (data.operationStatus) {
                            $mdDialog.hide();
                        } else {
                            $mdToast.show(
                                $mdToast.simple()
                                  .textContent('Given vehicle ID already exists')
                                  .position('bottom')
                                  .hideDelay(3000)
                              );
                        }
                    });
                } else {
                    nodeService.modifyNode(vm.node).then ( function() {
                        console.log("Modify success");
                        $mdDialog.hide();
                    });
                }
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };
        }
    ]);
}());