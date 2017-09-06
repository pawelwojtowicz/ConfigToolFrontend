(function () {
    'use strict';
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.service('templateElementService', [ '$http', 'appConfig', '$q',function($http, appConfig,$q) {
        var vm = this;
        vm.url = appConfig.getServiceUrl() + "/templateelement";   
    
        vm.addTemplateElement = function ( newTemplateElement ) {
            return $q(function( resolve, reject ){
                $http({	url: vm.url,
                        method: "POST",
                        data: newTemplateElement,
                        headers: {'Content-Type': 'application/json'}}).then (
                        function( response) {
                            resolve();
                        } , function () {
                            reject();
                        });
            });
        };   
            
        vm.deleteTemplateElement = function( templateId , parameterId) {
            return $q(function( resolve, reject ){
                var urlForRequest = vm.url + "/" + templateId + "/" + parameterId;
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