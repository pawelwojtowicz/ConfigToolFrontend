(function () {
    'use strict';
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.service("configGroupSetupService", ['$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
        var vm = this;
        vm.url = appConfig.getServiceUrl() + "/configurationgroupsetup";
        vm.moduleUpdateCallbacks = [];
    
        vm.addNewConfigGroupSetupItem = function ( configurationGroupId , configurationId ) {
            var targetUrl = vm.url +"/"+String(configurationGroupId)+"/"+String(configurationId);

            return $q(function( resolve, reject ){
                $http({	url: targetUrl,
                    method: "POST",
                    data: {},
                    headers: {'Content-Type': 'application/json'}}).then (
                    function( response) {
                        resolve();
                    } , function ()
                    {
                        reject();
                    });
                });
            };
        
        vm.deleteConfigGroupSetupItem = function( configurationGroupId , configuraitonId) {
            var targetUrl = vm.url +"/"+String(configurationGroupId)+"/"+String(configuraitonId);            
            return $http.delete(targetUrl);
        };
        
    
    }]);
}());