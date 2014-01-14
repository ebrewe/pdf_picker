'use strict';

var pdfApp = angular.module('pdfApp', [
  'ngRoute',
  'pdfControllers',
  'pdfServices'
])

pdfApp.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/list',{
        templateUrl: 'partials/pdf-list.html',
        controller: 'PdfListCtrl'
      }).
      otherwise({
        redirectTo:'/list'
      });
  }]);
