'use strict';

function APISchemaSearchCtrl($scope,$rootScope, $resource, $http, $timeout, apiSchemaSearchService) {

	$scope.gridHeaderMessages = "API Schema Search Results";
	$scope.$scope = $scope;
	$scope.apiSchemaSearchShowHideFilter = true;
	
	
	$rootScope.renderAPISchemaSearchGrid = function() {
		
		apiSchemaSearchService.renderAPISchemaSearchGrid($scope,$rootScope);

	//	$rootScope.submitAPISchemaSearchSearch();

	};

	$rootScope.submitAPISchemaSearchSearch = function() {
		var url = '/api360-service/dapi/report.json?';
		   
		var params =null;
		
		 params =	'type=' + $scope.getCommaSeparatedString($rootScope.getApiSchemaSearchFilterModel("searchSchema"))+ 
			 		'&api=' +$scope.getCommaSeparatedString($rootScope.getApiSchemaSearchFilterModel("Service")) + 
			 		'&version=' +$scope.getCommaSeparatedString($rootScope.getApiSchemaSearchFilterModel("apiVersion") )+ 
			 		'&keyword=' +$rootScope.getApiSchemaSearchFilterModel("keyword1") + 
			 		'&keyword01=' + $rootScope.getApiSchemaSearchFilterModel("keyword01")+
			 		'&exact=' + $rootScope.getApiSchemaSearchFilterModel("type2");		  
		
		//alert(params);
		$rootScope.launch('wait');	
		
		//$rootScope.bundleVersiontable.api().ajax.url(url+params).load($scope.searchGridCallback);
		$rootScope.apischematable.api().ajax.url(url+params).load($scope.searchGridCallback);	
	};
	
	
	$scope.searchGridCallback = function ()
	{
		$rootScope.$broadcast('dialogs.wait.complete');
		
		$('#apiSchemaSearchGridID tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
	};
	
	
	$scope.getCommaSeparatedString = function(json) 
	{ 
		if(json==undefined || json==null)
		{
			return "All";
		}
		
		var result = "";
		var found =false;
		
		for (var dString in json) 
		{ 
			
			result += json[dString].id + ",";
			found=true;
		}
		
		
		var res = result.match(/All,/g);
		
		if(res!=null && result.split(",").length > 1)
		{
			result = result.replace("All,", "");
		}
				
		if(!found || result=="")
		{
			return "All";
		}
		
		return result.replace(/,(\s+)?$/, '');
	};


	

};