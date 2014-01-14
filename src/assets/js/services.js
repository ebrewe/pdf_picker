'use strict';

var pdfServices = angular.module('pdfServices', ['ngResource']);

pdfServices.factory('Pdf', ['$resource',
  function($resource){
    
     return $resource('app/openFile.php', {}, {
       query: {method:'GET'}
     });
    
  }]);