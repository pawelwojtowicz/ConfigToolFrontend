(function () {
    'use strict';
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.service("exportService", ['$window', 'appConfig', function($window,appConfig ) {
        var vm = this;
        vm.url = appConfig.getServiceUrl() + "/exportconfig";
    
        vm.exportConfigurationItem = function (nodeId, configurationItemId ) {
            var exportUrl = vm.url+"/"+String(nodeId)+"/"+configurationItemId;
            $window.open(exportUrl);
        };
    }]);
    }());