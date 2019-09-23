'use strict';

function ApiProdHitCtrl($scope,$rootScope, $resource, $http, $timeout, ApiProdHitService) {

	$scope.gridHeaderMessages = "API Production Hit Count Results";
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
	
	$rootScope.renderApiProdHitGrid = function() {
		
		ApiProdHitService.renderApiProdHitGrid($scope,$rootScope);

	//	$rootScope.submitAPISchemaSearchSearch();

	};

	$rootScope.submitAPISchemaSearchSearch = function() {
			var url = '/api360-service/api-usage/lookup/prodhitcount.json?';
			   
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
						+ '&profile=' + $scope.getCommaSeparatedString($rootScope.getResourceFinderFilterModel("minorVersion"))
						+ '&bundle=' + $scope.getCommaSeparatedString($rootScope.getResourceFinderFilterModel("bundle"))
				
				$rootScope.launch('wait');	
				
				//$rootScope.bundleVersiontable.api().ajax.url(url+params).load($scope.searchGridCallback);
				$rootScope.apiprodhittable.api().ajax.url(url+params).load($scope.searchGridCallback);	
			//}
	};
	
	$rootScope.submitDefaultAPISchemaSearchSearch = function(latestversion) {
		var url = '/api360-service/api-usage/lookup/prodhitcount.json?';
		   
		var params =null;
		/*alert($rootScope.getApiSchemaSearchFilterModel("api"));
		alert($rootScope.getApiSchemaSearchFilterModel("majorVersion"));
		alert($rootScope.getApiSchemaSearchFilterModel("minorVersion"));
		alert($rootScope.getApiSchemaSearchFilterModel("seniorTD"));
		alert($rootScope.getApiSchemaSearchFilterModel("maxResourceCount"));*/
		
		params = 'api=All' 
				+ '&profile=All' 
				+ '&bundle=All'; 
		
		$rootScope.launch('wait');	
		
		//$rootScope.bundleVersiontable.api().ajax.url(url+params).load($scope.searchGridCallback);
		$rootScope.apiprodhittable.api().ajax.url(url+params).load($scope.searchGridCallback);	
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