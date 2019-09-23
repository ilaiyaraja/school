'use strict';

function GlobalFilterCtrl($scope,$rootScope, $resource, $http, $location,globalFilterService) 
{
	
	globalFilterService.updateGlobalScopeFiltersWithDefaultValues($scope,$rootScope);
	
	$rootScope.resetGlobalFilterValues = function()
	{
		globalFilterService.updateGlobalScopeFiltersWithDefaultValues($scope,$rootScope);
	};
	
	
	$rootScope.getModelObject = function (str)
    {
    	
		var returnArray = new Array();
		
		if (str!=undefined)
		 {
			  var strArray = str.split(",");
		      for(var i=0; i < strArray.length; i++)
		    	{
		    		var idProp = {idProp: 'id'};
		    		idProp['id'] = strArray[i];	    		
		    		returnArray.push(idProp);			    		
		    	}
	      
	      }else {
	    	  var idProp = {idProp: 'id'};
	    		idProp['id'] = 'All';	    		
	    		returnArray.push(idProp);
				
			}
		
		    return returnArray;
		
    };
	
	
	$rootScope.getGlobalURLFilter = function(model)
	 {
		 if("Clients"==model)
		 {
			 return $scope.global_client;	
		 }
		 else if("Programs"==model)
		 {
			return $scope.global_program;
		 }
		 else if("Profiles"==model)
		 {
			 return $scope.global_profile;
		 }	
		 else if("Bundles"==model)
		 {
			 return $scope.global_bundle;
		 }	
		 else if("APIs"==model)
		 {
			 return $scope.global_api;			 
		 }
		 else if("Backends"==model)
		 {
			return $scope.global_backend;
		 }	
		 else if("Environments"==model)
		 {
			return $scope.global_environment;
		 }		  
	 };
	
	
	$rootScope.copySelectedFilters = function(nextURL) 
	{
		
		if("/dashboard"==$location.url())
		{
			$scope.global_program = $rootScope.getDashboardURLFilter("Programs");	
			$scope.global_client = $rootScope.getDashboardURLFilter("Clients");	 
			$scope.global_profile = $rootScope.getDashboardURLFilter("Profiles");	
			$scope.global_bundle = $rootScope.getDashboardURLFilter("Bundles");	
			$scope.global_api = $rootScope.getDashboardURLFilter("APIs");	
			$scope.global_environment = $rootScope.getDashboardURLFilter("Environments");	
			$scope.global_backend = $rootScope.getDashboardURLFilter("Backends");  
		}
		else if("/api_portfolio"==$location.url())
		{
			$scope.global_program = $rootScope.getAPIPortfolioURLFilter("Programs");	
			$scope.global_client = $rootScope.getAPIPortfolioURLFilter("Clients");	 
			$scope.global_profile = $rootScope.getAPIPortfolioURLFilter("Profiles");	
			$scope.global_bundle = $rootScope.getAPIPortfolioURLFilter("Bundles");	
			$scope.global_api = $rootScope.getAPIPortfolioURLFilter("APIs");	
			$scope.global_environment = $rootScope.getAPIPortfolioURLFilter("Environments");	
			$scope.global_backend = $rootScope.getAPIPortfolioURLFilter("Backends");  
		}
		else if("/project_portfolio"==$location.url())
		{
			$scope.global_bundle = $rootScope.getProjectPortfolioURLFilter("Bundles");	
			$scope.global_api = $rootScope.getProjectPortfolioURLFilter("APIs");
			$scope.global_backend = $rootScope.getProjectPortfolioURLFilter("Backends");  
			$scope.global_program = $rootScope.getProjectPortfolioURLFilter("Programs");  
			
		}else if("/installed_bundle_versions"==$location.url())
		{
			$scope.global_bundle = $rootScope.geInstalledBundleURLFilter("Bundles");	
		}else if("/adapter_inventory"==$location.url())
		{
			$scope.global_backend = $rootScope.geAdapterInventoryURLFilter("Backends");  
			$scope.global_api = $rootScope.geAdapterInventoryURLFilter("APIs");	
		}else if("/api_taxonomy"==$location.url())
		{
			$scope.global_bundle = $rootScope.getAPITaxonomyURLFilter("Bundles");
			$scope.global_api =  $rootScope.getAPITaxonomyURLFilter("APIs");	
		}else if("/func_test_exec_status"==$location.url())
		{
			$scope.global_api = $rootScope.getFunTestResultURLFilter("APIs");
			$scope.global_backend = $rootScope.getFunTestResultURLFilter("Backends");  
			$scope.global_bundle = $rootScope.getFunTestResultURLFilter("Bundles");	
			
			
		}
		
		
		
		
		
		
		
	};
};