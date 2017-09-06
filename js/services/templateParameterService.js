(function () {
    'use strict';
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.service('templateParameterService', [ '$http', 'appConfig', '$q' ,function($http,appConfig, $q) {
        var vm = this;
        vm.url = appConfig.getServiceUrl() + "/templateparameter";
    
        vm.addTemplateParameter = function ( templateParameter ) {
            return $q(function( resolve, reject ){
                $http({	url: vm.url,
                        method: "POST",
                        data: templateParameter,
                        headers: {'Content-Type': 'application/json'}}).then (
                        function( response) {
                            resolve();
                        } , function ()
                        {
                            reject();
                        });
                    });
        };
    
        
        vm.getAllTemplatesParameters = function() {
            return $q( function(resolve, reject) {
                $http.get(vm.url).then( function( response) {
                    resolve(response.data);
                },function(error) {
                    reject();
                });
            });
        };
    
        vm.getTemplateParameterById = function( templateParameterId) {
            return $q ( function( resolve, reject ) {
                var requestUrl = vm.url+'/'+templateParameterId;
                $http.get(requestUrl).then( function( response) {
                    resolve(response.data);
                },function(error) {
                    reject( error );
                });
            });
        };
    
            
        vm.deleteTemplateParameter = function( templateParameterId ) {
            var urlForDeleting = vm.url + "/" + String(templateParameterId);
            return $http.delete(urlForDeleting);
        };	
    }]);
    }());