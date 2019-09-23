'use strict';

function ApiResourceFinderCtrl($scope,$rootScope, $resource, $http, $timeout, ApiResourceFinderService) {

	$scope.gridHeaderMessages = "API Resource Finder Results";
	$scope.$scope = $scope;
	$scope.apiSchemaSearchShowHideFilter = true;
	
	$scope.apiSchemaSearchShowHide = function() {
		if ($scope.apiSchemaSearchShowHideFilter) {
			$("#apiSchemaSearchFilterId").fadeOut("slow");
		} else {
			$("#apiSchemaSearchFilterId").fadeIn("slow");
		}

	};
	
	/*$rootScope.renderGrid = function()
	{
		adapterInventoryService.renderAdapterInventoryGrid($scope,$rootScope);
		$rootScope.submitAdapterInventroyDefaultSearch();
	};*/	
	
	$rootScope.renderAPISchemaSearchGrid = function() {
		
		ApiResourceFinderService.renderAPISchemaSearchGrid($scope,$rootScope);

	//	$rootScope.submitAPISchemaSearchSearch();

	};

	$rootScope.submitAPISchemaSearchSearch = function() {
			var url = '/api360-service/resource-finder/lookup/resource/new.json?';
			   
			var params =null;
			/*alert($rootScope.getApiSchemaSearchFilterModel("api"));
			alert($rootScope.getApiSchemaSearchFilterModel("majorVersion"));
			alert($rootScope.getApiSchemaSearchFilterModel("minorVersion"));
			alert($rootScope.getApiSchemaSearchFilterModel("seniorTD"));
			alert($rootScope.getApiSchemaSearchFilterModel("maxResourceCount"));*/
			
			//if($rootScope.getResourceFinderFilterModel("api")==undefined){
				//alert("Please select an API");
			//	$rootScope.launch("custom9");
			//}else if($rootScope.getResourceFinderFilterModel("majorVersion")==undefined){
			//	$rootScope.launch("custom10");
			//}else{
				params = 'api=' + $scope.getCommaSeparatedString($rootScope.getResourceFinderFilterModel("api"))
						+ '&majorVersion=' + $scope.getCommaSeparatedString($rootScope.getResourceFinderFilterModel("majorVersion"))
						+ '&profile=' + $scope.getCommaSeparatedString($rootScope.getResourceFinderFilterModel("minorVersion"))
						+ '&srtd=' + $scope.getCommaSeparatedString($rootScope.getResourceFinderFilterModel("seniorTD"))
						+ '&bundle=' + $scope.getCommaSeparatedString($rootScope.getResourceFinderFilterModel("bundle"))
						+ '&maxResourceCount=' + $rootScope.getResourceFinderFilterModel("maxResourceCount");
				
				$rootScope.launch('wait');	
				
				//$rootScope.bundleVersiontable.api().ajax.url(url+params).load($scope.searchGridCallback);
				$rootScope.apiresourcefindertable.api().ajax.url(url+params).load($scope.searchGridCallback);	
			//}
	};
	
	$rootScope.submitDefaultAPISchemaSearchSearch = function(latestversion) {
		var url = '/api360-service/resource-finder/lookup/resource/new.json?';
		   
		var params =null;
		/*alert($rootScope.getApiSchemaSearchFilterModel("api"));
		alert($rootScope.getApiSchemaSearchFilterModel("majorVersion"));
		alert($rootScope.getApiSchemaSearchFilterModel("minorVersion"));
		alert($rootScope.getApiSchemaSearchFilterModel("seniorTD"));
		alert($rootScope.getApiSchemaSearchFilterModel("maxResourceCount"));*/
		
		params = 'api=All' 
				+ '&majorVersion=97'
				+ '&profile=All' 
				+ '&srtd=All' 
				+ '&bundle=All' 
				+ '&maxResourceCount=All' ;
		
		$rootScope.launch('wait');	
		
		//$rootScope.bundleVersiontable.api().ajax.url(url+params).load($scope.searchGridCallback);
		$rootScope.apiresourcefindertable.api().ajax.url(url+params).load($scope.searchGridCallback);	
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