(function () {
    'use strict';
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.service('templateRestrictionService', [ '$http', 'appConfig', '$q' , function($http,appConfig,$q) {
        var vm = this;
        vm.url = appConfig.getServiceUrl() + "/templaterestriction";   
    
        vm.addRestriction = function ( templateRestriction ) {
            return $q(function( resolve, reject ){
                $http({	url: vm.url,
                        method: "POST",
                        data: templateRestriction,
                        headers: {'Content-Type': 'application/json'}}).then (
                        function( response) {
                            resolve();
                        } , function () {
                            reject();
                        });
            });
        };   
            
        vm.deleteRestriction = function( templateId , restrictedTemplate) {
            return $q(function( resolve, reject ){
                var urlForRequest = vm.url + "/" + templateId + "/" + restrictedTemplate;
                $http({	url: urlForRequest,
                        method: "DELETE",
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

    
    }]);
    }());