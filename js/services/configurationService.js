(function () {
    'use strict';
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.service("configurationService", ['$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
        var vm = this;
        vm.url = appConfig.getServiceUrl() + "/configuration";
    
        vm.saveConfiguration = function (configuration ) {
            return $q(function( resolve, reject ){
                $http({	url: vm.url,
                        method: "POST",
                        data: configuration,
                        headers: {'Content-Type': 'application/json'}}).then (
                        function( response) {
                            resolve(response.data);
                        } , function ()
                        {
                            reject();
                        });
                    });
        };

        vm.getConfigurationById = function( configurationId ) {
            return $q ( function( resolve, reject ) {
                var requestUrl = vm.url+'/'+String(configurationId);
                $http.get(requestUrl).then( function( response) {
                    resolve(response.data);
                },function(error) {
                    reject( error );
                });
            });
        };
    
        
        vm.getAllConfigurations = function() {
            return $q( function(resolve, reject) {
                $http.get(vm.url).then( function( response) {
                    resolve(response.data);
                },function(error) {
                    reject();
                });
            });
        };
        
    
            
        vm.deleteConfiguration = function( configurationId) {
            var urlForDeleting = vm.url + "/" + String(configItemId);
            return $http.delete(urlForDeleting);
        };
        
    
    }]);
    }());