(function () {
    'use strict';
    
    var configurationApp = angular.module('configurationApp');
    
    configurationApp.filter('removeTemplatesFrom', function() {
      return function( inputTable , exclusionTable, ownTemplateId ) {
        var filterOutput = [];
        
        angular.forEach( inputTable, function (item) {
            var found = false;
            if (ownTemplateId !== item.templateId ) {
                angular.forEach( exclusionTable, function ( excludingItem ) {
                    if (item.templateId === excludingItem.templateId)  {
                        found = true;
                    }
                });
            
                if (!found) {
                    filterOutput.push(item);
                    found = false;
                }
            }
        });
        
        return filterOutput;
      };
    } );
    }());