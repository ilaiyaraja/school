'use strict';


function AdapterInventoryFiltersCtrl($scope,$rootScope, $resource, $http, $location,adapterInventoryFilterService) 
{
	
	if(!jQuery.isEmptyObject($location.search()))
	{
		$rootScope.urlapp = $location.search().app;		
		$rootScope.urlparams = $location.search();
	}	
	
	$rootScope.pageLoaction="";	
		
	$rootScope.emailLink= function()
	{
		var params = 'app='+$location.path().replace("/","")
		
		params = params +  '&Backends=' + $scope.getCommaSeparatedString($rootScope.getAdapterInventoryFilterModel("Backends"));
		params = params +  '&Bundles=' + $scope.getCommaSeparatedString($rootScope.getAdapterInventoryFilterModel("Bundles"));
		params = params +  '&APIs=' + $scope.getCommaSeparatedString($rootScope.getAdapterInventoryFilterModel("APIs"));		
		
			
		
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
    	 adapterInventoryFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
    	 adapterInventoryFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);
    	 var url = "/api360-service/filter/lookup/"+$scope.backend+"/"+$scope.bundle+"/"+$scope.api+"/adapter_inventory_filters.json";
    	 adapterInventoryFilterService.loadComboBox($scope,$rootScope,$http,url,$location.path());
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
	
	 $rootScope.getAdapterInventoryFilterModel = function(model)
	 {
		 if("APIs"==model)
		 {
			 return $scope.apiAdapterInventoryModel;			 
		 }
		 else if("Backends"==model)
		 {
			return $scope.backendAdapterInventoryModel;
			
		 }else if("Bundles" == model ){
			 
			 return $scope.bundleAdapterInventoryModel;
			 
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
		 adapterInventoryFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
		 $rootScope.resetGlobalFilterValues();
		 $scope.resetComboBox();		 
		 $rootScope.submitAdapterInventorySearch();
	 };
	 
	 $scope.resetComboBox= function() 
	 {
		 var url = "/api360-service/filter/lookup/"+$scope.backend+"/"+$scope.bundle+"/"+$scope.api+"/adapter_inventory_filters.json";
         $rootScope.loadAdapterInventoryComboBox($scope,$rootScope,$http,url,$location.path());         
	 };
	 	
	 $rootScope.ReLoadAdapterInventoryComboBox= function(name, value) 
	 {
		 adapterInventoryFilterService.dashboardFilterReload($scope,$rootScope,name, value); 
		 var url = "/api360-service/filter/lookup/"+$scope.backend+"/"+$scope.bundle+"/"+$scope.api+"/adapter_inventory_filters.json";
		 adapterInventoryFilterService.reloadComboBoxAdapterInventory($scope,$rootScope,$http,url,name);		
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