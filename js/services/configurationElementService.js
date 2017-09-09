(function () {
    'use strict';
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.service("configurationElementService", ['$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
        var vm = this;
        vm.url = appConfig.getServiceUrl() + "/configurationelement";
    
        vm.saveConfigurationElement = function (configurationElement ) {
            return $q(function( resolve, reject ){
                $http({	url: vm.url,
                        method: "POST",
                        data: configurationElement,
                        headers: {'Content-Type': 'application/json'}}).then (
                        function( response) {
                            resolve(response.data);
                        } , function ()
                        {
                            reject();
                        });
                    });
        };

        vm.getConfigurationElementById = function( configurationId ) {
            return $q ( function( resolve, reject ) {
                var requestUrl = vm.url+'/'+String(configurationId);
                $http.get(requestUrl).then( function( response) {
                    resolve(response.data);
                },function(error) {
                    reject( error );
                });
            });
        };
           
    
            
        vm.deleteConfigurationElement = function( configurationId) {
            var urlForDeleting = vm.url + "/" + String(configItemId);
            return $http.delete(urlForDeleting);
        };
    }]);
    }());