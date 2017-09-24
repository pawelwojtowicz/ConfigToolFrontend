(function () {
    'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.controller('navigationController',['$scope','$location',function( $scope, $location )
	{
        var vm = this;
        vm.navigationMenu = [
                             { buttonCaption: "Devices" ,      pageName: "devicepage"},
                             { buttonCaption: "Modules" ,      pageName: "modulepage"},
                             { buttonCaption: "Config items" , pageName: "configitempage"},
                             { buttonCaption: "Templates" ,    pageName: "templatepage"},
                             { buttonCaption: "Parameters",    pageName: "parameterpage"},
                             { buttonCaption: "Configuration",    pageName: "configurationpage"},
                             { buttonCaption: "Configuration Group", pageName:"configurationgrouppage"},
                             { buttonCaption: "Vehicles", pageName:"nodepage"}
                            ];
        
        vm.goTo = function ( pageName ) {
            $location.url("/" + pageName);
        };
	}]);
}());