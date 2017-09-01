(function () {
    'use strict';
var configurationApp = angular.module('configurationApp');

configurationApp.controller('navigationController',['$scope','$location',function( $scope, $location )
	{
        var vm = this;
        vm.navigationMenu = [
                             { buttonCaption: "Devices" , pageName: "devicepage"},
                             { buttonCaption: "Modules" , pageName: "modulepage"},
                             { buttonCaption: "Config items" , pageName: "configitempage"},
                             { buttonCaption: "Templates" , pageName: "templatepage"}
                            ];
        
        vm.goTo = function ( pageName ) {
            $location.url("/" + pageName);
        };
	}]);
}());