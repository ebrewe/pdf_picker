'use strict'; 

var pdfControllers = angular.module('pdfControllers', []);

pdfControllers.controller('PdfListCtrl', ['$scope', '$http',
  function($scope, $http){
    $scope.tableLoaded = false;
    $http.get('app/data/mnr_all-v3.xml').success( function(data){
      var x2js = new X2JS(); 
      var jsonOb = x2js.xml_str2json( data );
      $scope.pdfs = jsonOb.Docs.Doc;
       
      
      $scope.fPdfs = $scope.filterPdfs($scope.pdfs, $scope.currentTitle);
      $scope.tableLoaded = true;
    })
    $scope.titles = "MNR*MNR/AFFM*MNR/About*MNR/Aggregates*MNR/Aquatics*MNR/Bearwise*MNR/Biodiversity*MNR/CLTIP*MNR/CNFER*MNR/ClimateChange*MNR/ContactUs*MNR/CrownLand*MNR/EmergencyManagement*MNR/Enforcement*MNR/FW*MNR/FarNorth*MNR/Forests*MNR/GeographicNames*MNR/GlobalFiles*MNR/GreatLakes*MNR/HomePage*MNR/KidsFish*MNR/LIO*MNR/LUEPS*MNR/LetsFish*MNR/NESI*MNR/NHIC*MNR/NWSI*MNR/Newsroom*MNR/OC*MNR/OFRI*MNR/OGSR*MNR/OMLC*MNR/OSG*MNR/OntarioWood*MNR/Parks*MNR/Rabies*MNR/Renewable*MNR/SORR*MNR/Species*MNR/Water*MNR/Wildlife*MNR/Youth*".split("*");
    
    $scope.currentTitle = $scope.titles[0];
    
    $scope.$watch('currentTitle', function(newValue, oldValue){
      $scope.fPdfs = $scope.filterPdfs($scope.pdfs, $scope.currentTitle);
      $scope.addAdded( $scope.fPdfs);
    });
    
    $scope.orderProp = 'Subject';
    
    $scope.rowCollapse = function(ev){
      console.log(ev.srcElement)
    }
    
    $scope.filterPdfs = function(list, filter){
      var rets = [];
      if(list){
        angular.forEach(list, function(value, key){
          if(value.hasOwnProperty('Account') && value.Account == filter){
            value.toAdd = true;
            rets.push(value);
          }
        });
      }
      
     
      
      return rets;
    }
    
    $scope.addList = []
    
    $scope.addAdded = function( list ){
			 angular.forEach(list, function(lv, lk){
			   $scope.fPdfs[lk].toAdd = true; 
					angular.forEach($scope.addList, function(v, k){
						if( lv.Name == v.Name){
							$scope.fPdfs[lk].toAdd = false;
							$scope.addList[k] = $scope.fPdfs[lk]; 
						}
					});
				});
    }
    
    $scope.hasData = function(field){
      if(field.length) 
        return true
      return false
    }
    
    $scope.toggleAdded = function(pdf){
      if( pdf.toAdd)
        $scope.addPdf( pdf )
      else
        $scope.removePdf(pdf)
      pdf.toAdd = !pdf.toAdd
      console.log($scope.addList);
    }
    
    $scope.addPdf = function( pdf){
      var matches = 0;
      for( var i = 0, j=$scope.addList.length; i< j; i++){
         if( $scope.addList[i] == pdf)
           matches ++;
      }
      
      if(matches <= 0){
        $scope.addList.push(pdf);
        $scope.addList.sort($scope.sortList);
      }
    }
    
    $scope.removePdf = function(pdf){
    
      for( var i = 0, j=$scope.addList.length; i< j; i++){
         if( $scope.addList[i] == pdf){
           $scope.addList.splice(i, 1);
           $scope.addList.sort($scope.sortList);
         }
      }
    }
    
    $scope.sortList = function(a, b){
				if( a.Account < b.Account)
					return -1;
				if( a.Account > b.Account)
					return 1;
				return 0;
		}
		
		$scope.getCSV = function(){
		  var gurl = 'app/getCSV.php',
		  names = [];
		  $http.get(gurl).success( function(data){
		     names = data.split('*'); 
				 $scope.addList.length = 0; 
				 $scope.addAdded($scope.fPdfs);
		     for( var i = 0, j = names.length; i < j; i++){
		       if( names[i] != "" && names[i] !== 'Name' && names[i] !== "*"){
		         var pdfItem = {};
		         pdfItem.Name = names[i];
		         $scope.addList.push(pdfItem);
		       }
		     }
		     $scope.addAdded($scope.fPdfs); 
		  });
		}
		
		$scope.saveCSV = function(){
		  console.log ('Saving', $scope.addList);
		  var purl = 'app/putCSV.php',
		  postData = $scope.addList;
		  $http({
            url: purl,
            method: "POST",
            data: postData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
                console.log(data);
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
		}
		
  
  }])
  .directive('table', function(){
    return({
      restrict: "E",
      link: function( $scope, $element, attr){
        $scope.$watch('tableLoaded', function(newValue, oldValue){
          if( newValue == true){
            console.log ('added table');  
            $scope.getCSV()
          }
        });
      }
    });
  })
  
