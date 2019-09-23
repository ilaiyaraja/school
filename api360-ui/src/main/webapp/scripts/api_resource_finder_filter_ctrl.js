'use strict';


function ApiResourceFinderFilterCtrl($scope,$rootScope, $resource, $http, $location,ApiResourceFinderFilterService) 
{
	$scope.maxResourceCount = 5;
	
	$scope.addMaxResourceCount = function(event){
		$scope.maxResourceCount = $scope.maxResourceCount + 1;
	};
	
	$scope.subtractMaxResourceCount = function(event){
		if($scope.maxResourceCount > 0){
			$scope.maxResourceCount = $scope.maxResourceCount - 1;
		}
	};
	
	if(!jQuery.isEmptyObject($location.search()))
	{
		$rootScope.urlapp = $location.search().app;		
		$rootScope.urlparams = $location.search();
	}	
	
	$rootScope.pageLoaction="";	
		
	$rootScope.emailLink= function()
	{
		var params = 'app='+$location.path().replace("/","")
		
		params = params +  'api=' + $scope.getCommaSeparatedString($rootScope.getResourceFinderFilterModel("api"));
		params = params + '&majorVersion=' + $rootScope.getResourceFinderFilterModel("majorVersion");
		params = params + '&profile=' + $rootScope.getResourceFinderFilterModel("minorVersion");
		params = params + '&srtd=' + $rootScope.getResourceFinderFilterModel("seniorTD");
		params = params + '&bundle=' + $rootScope.getResourceFinderFilterModel("bundle");
		params = params + '&maxResourceCount=' + $rootScope.getResourceFinderFilterModel("maxResourceCount");
			
		
		var protocol = $location.protocol();
		var host = $location.host();
		var port = $location.port();
		var path = "otherwise";
		
		var url = protocol+"://"+host+":"+port+"/api360-ui/#/"+path+"?"+escape(params);
				
		var link = "mailto:"+ $rootScope.loginuser
        + "?subject=API360 Email as link"		
        + "&body="+url;
		
		//window.prompt("Copy to clipboard: Ctrl+C, Enter", url);		
		window.location.href = link;
	};
	
	
     $rootScope.loadAdapterInventoryComboBox= function() 
	 {
    	 ApiResourceFinderFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
    	 ApiResourceFinderFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);
    	 //var url = "http://hvdivd05cas1081.itservices.sbc.com:8080/api360-service/resource-finder/lookup/All/All/All/All/allfilters.json";
    	 var url = "/api360-service/resource-finder/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.srtd+"/"+$scope.bundle+"/allfilters.json";
    	 ApiResourceFinderFilterService.loadComboBoxA($scope,$rootScope,$http,url,$location.path(),true);
    	 $rootScope.submitDefaultAPISchemaSearchSearch();
	 };
	 
	 $rootScope.resetAdapterInventoryComboBox= function() 
	 {
    	 ApiResourceFinderFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
    	 ApiResourceFinderFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);
    	 //var url = "/api360-service/filter/lookup/"+$scope.backend+"/"+$scope.bundle+"/"+$scope.api+"/adapter_inventory_filters.json";
    	 //var url = "/api360-service/resource-finder/lookup/All/All/All/All/allfilters.json";
    	 var url = "/api360-service/resource-finder/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.srtd+"/"+$scope.bundle+"/allfilters.json";
    	 ApiResourceFinderFilterService.loadComboBoxA($scope,$rootScope,$http,url,$location.path(),false);
    	 $rootScope.submitAPISchemaSearchSearch();
	 };
	 
	 
	 $rootScope.getAdapterInventoryGlobalFilterModel = function(model)
	 {
		 
		 	
		 if("APIs"==model)
		 {
			 return $rootScope.getModelObject($rootScope.getGlobalURLFilter("APIs"));			 
		 }
		 else if("Backends"==model)
		 {
			return $rootScope.getModelObject($rootScope.getGlobalURLFilter("Backends"));
		 }
		 
	 };
	
	 $rootScope.getResourceFinderFilterModel = function(model)
	 {
		 
			 if ("api" == model)
			 {
				 //console.log($scope.apiApiResourceFinderModel);
				 return $scope.apiApiResourceFinderModel;
			 } 
			 else if ("majorVersion" == model)
			 {
				 //return $scope.majorApiResourceFinderModel.id;
				 return $scope.majorApiResourceFinderModel;
			 } 
			 else if ("minorVersion" == model) 
			 {
				 //if($scope.minorApiResourceFinderModel.id == undefined){
				//	 return "0";
				 //}
				 //return $scope.minorApiResourceFinderModel.id;
				 return $scope.minorApiResourceFinderModel;
			 } 
			 else if ("bundle" == model) 
			 {
				 //if($scope.minorApiResourceFinderModel.id == undefined){
				//	 return "0";
				 //}
				 //return $scope.minorApiResourceFinderModel.id;
				 return $scope.bundleApiResourceFinderModel;
			 } 
			 else if ("maxResourceCount" == model)
			 {
				return $scope.maxResourceCount;
			 } 
			 else if ("seniorTD" == model)
			 {
				 //if($scope.srtdApiResourceFinderModel.id == undefined){
				//	 return "All";
				 //}
				 //return $scope.srtdApiResourceFinderModel.attuid;
				 return $scope.srtdApiResourceFinderModel;
				//return "All";
			 } 
		 
	 };
	 
	 
	 $rootScope.geAdapterInventoryURLFilter= function(model)
	 {
		 if("APIs"==model)
		 {
			 return $scope.api;			 
		 }
		 else if("Backends"==model)
		 {
			return $scope.backend;
		 }
		 
	 };
	 
	 
	 $rootScope.resetAdapterInventoryFilters = function()
	 {
		 $rootScope.urlparams=null;
		 ApiResourceFinderFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
		 $rootScope.resetGlobalFilterValues();
		 $scope.resetComboBox();		 
		 $rootScope.submitAdapterInventorySearch();
	 };
	 
	 $rootScope.getResourceFinderLatestVersion = function()
	 {
		 return $scope.majorApiResourceFinderModel.label;
	 };
	 
	 $scope.resetComboBox= function() 
	 {
		 var url = "/api360-service/filter/lookup/"+$scope.backend+"/"+$scope.bundle+"/"+$scope.api+"/adapter_inventory_filters.json";
         $rootScope.loadAdapterInventoryComboBox($scope,$rootScope,$http,url,$location.path());         
	 };
	 	
	 $rootScope.ReLoadResourceFinderComboBox= function(name, value) 
	 {
		 //alert(name +":"+value);
		 ApiResourceFinderFilterService.dashboardFilterReload($scope,$rootScope,name, value); 
		 var url = "/api360-service/resource-finder/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.srtd+"/"+$scope.bundle+"/allfilters.json";
		 ApiResourceFinderFilterService.reloadComboBoxAdapterInventory($scope,$rootScope,$http,url,name);
		 $rootScope.submitAPISchemaSearchSearch();
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