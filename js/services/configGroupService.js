(function () {
    'use strict';
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.service("configGroupService", ['$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
        var vm = this;
        vm.url = appConfig.getServiceUrl() + "/configurationgroup";
        vm.moduleUpdateCallbacks = [];
    
        vm.addNewConfigGroup = function (configGroup ) {
            return $q(function( resolve, reject ){
                $http({	url: vm.url,
                        method: "POST",
                        data: configGroup,
                        headers: {'Content-Type': 'application/json'}}).then (
                        function( response) {
                            resolve();
                        } , function ()
                        {
                            reject();
                        });
                    });
        };

        vm.getConfigGroupById = function( configGroupId ) {
            return $q ( function( resolve, reject ) {
                var requestUrl = vm.url+'/'+String(configGroupId);
                $http.get(requestUrl).then( function( response) {
                    resolve(response.data);
                },function(error) {
                    reject( error );
                });
            });
        };
    
        
        vm.getAllConfigGroups = function() {
            return $q( function(resolve, reject) {
                $http.get(vm.url).then( function( response) {
                    resolve(response.data);
                },function(error) {
                    reject();
                });
            });
        };
        
        vm.deleteConfigGroup = function( configGroupId) {
            var urlForDeleting = vm.url + "/" + String(configGroupId);
            return $http.delete(urlForDeleting);
        };
        
    
    }]);
}());