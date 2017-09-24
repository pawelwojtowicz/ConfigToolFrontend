(function () {
    'use strict';
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.service("nodeService", ['$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
        var vm = this;
        vm.url = appConfig.getServiceUrl() + "/node";
    
        vm.addNode = function (node) {
            return $q(function( resolve, reject ){
                $http({	url: vm.url,
                        method: "POST",
                        data: node,
                        headers: {'Content-Type': 'application/json'}}).then (
                        function( response) {
                            resolve(response.data);
                        } , function ()
                        {
                            reject();
                        });
                    });
        };

        vm.modifyNode = function (node) {
            return $q(function( resolve, reject ){
                $http({	url: vm.url,
                        method: "PUT",
                        data: node,
                        headers: {'Content-Type': 'application/json'}}).then (
                        function( response) {
                            resolve(response);
                        } , function ()
                        {
                            reject();
                        });
                    });
        };

        
        vm.getAllNodes = function() {
            return $q( function(resolve, reject) {
                $http.get(vm.url).then( function( response) {
                    resolve(response.data);
                },function(error) {
                    reject();
                });
            });
        };
        
        vm.getNodeById = function( nodeId ) {
            return $q ( function( resolve, reject ) {
                var requestUrl = vm.url+'/'+nodeId;
                $http.get(requestUrl).then( function( response) {
                    resolve(response.data);
                },function(error) {
                    reject( error );
                });
            });
        };
    
            
        vm.deleteNode = function( nodeId) {
            var urlForDeleting = vm.url + "/" + String(nodeId);
            return $http.delete(urlForDeleting);
        };
        
    
    }]);
    }());