(function () {
    'use strict';
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.service('templateDependencyService', [ '$http', 'appConfig', '$q' , function($http,appConfig,$q) {
        var vm = this;
        vm.url = appConfig.getServiceUrl() + "/templatedependency";   
    
        vm.addDependency = function ( templateDependency ) {
            return $q(function( resolve, reject ){
                $http({	url: vm.url,
                        method: "POST",
                        data: templateDependency,
                        headers: {'Content-Type': 'application/json'}}).then (
                        function( response) {
                            resolve();
                        } , function () {
                            reject();
                        });
            });
        };   
            
        vm.deleteDependency = function( templateId , rerequiredTemplateId) {
            return $q(function( resolve, reject ){
                var urlForRequest = vm.url + "/" + templateId + "/" + rerequiredTemplateId;
                console.log("such url" + urlForRequest);
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