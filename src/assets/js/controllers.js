'use strict'; 

var pdfControllers = angular.module('pdfControllers', []);

pdfControllers.controller('PdfListCtrl', ['$scope', 'Pdf',
  function($scope, Pdf){
  
    $scope.pdfs = Pdf.query();
    console.log( $scope.pdfs );
    
  
  }])