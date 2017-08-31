(function () {
    'use strict';
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.service("configItemService", ['$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
        var vm = this;
        vm.url = appConfig.getServiceUrl() + "/configurationitem";
        vm.moduleUpdateCallbacks = [];
    
        vm.addNewConfigItem = function (configItem ) {
            return $q(function( resolve, reject ){
                $http({	url: vm.url,
                        method: "POST",
                        data: configItem,
                        headers: {'Content-Type': 'application/json'}}).then (
                        function( response) {
                            resolve();
                        } , function ()
                        {
                            reject();
                        });
                    });
        };

        vm.getConfigItemById = function( configItemId ) {
            return $q ( function( resolve, reject ) {
                var requestUrl = vm.url+'/'+String(configItemId);
                $http.get(requestUrl).then( function( response) {
                    resolve(response.data);
                },function(error) {
                    reject( error );
                });
            });
        };
    
        
        vm.getAllConfigItems = function() {
            return $q( function(resolve, reject) {
                $http.get(vm.url).then( function( response) {
                    resolve(response.data);
                },function(error) {
                    reject();
                });
            });
        };
        
    
            
        vm.deleteConfigItem = function( configItemId) {
            var urlForDeleting = vm.url + "/" + String(configItemId);
            return $http.delete(urlForDeleting);
        };
        
    
    }]);
    }());