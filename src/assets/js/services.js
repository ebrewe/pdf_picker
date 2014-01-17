'use strict';

var pdfServices = angular.module('pdfServices', ['ngResource']);

pdfServices.factory('PDF', ['$resource',
  function($resource){
    
     return $resource('app/openFile.php?filter=:filt', {}, {
       query: {method:'GET', params:{filt:'' }, isArray:false}
     });
    
  }]);