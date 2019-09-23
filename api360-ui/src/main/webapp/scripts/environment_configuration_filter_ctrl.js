'use strict';


function EnvironmentConfigurationFiltersCtrl($scope,$rootScope, $resource, $http, $location,environmentConfigurationFilterService) 
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
		
		params = params +  '&adapters=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Adapters"));
		params = params +  '&adapterBundles=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("AdapterBundles"));
		params = params +  '&serviceBundles=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("ServiceBundles"));
		params = params +  '&releases=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Releases"));
		params = params +  '&versions=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Versions"));
		params = params +  '&environments=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Environments"));
		params = params +  '&vtierhostnames=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Vtierhostnames"));
		
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
	
	
     $rootScope.loadEnvConfigComboBox= function() 
	 {
    	 environmentConfigurationFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
    	 environmentConfigurationFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);
    	 var url = "/api360-service/environment_configuration/lookup/"+$scope.adapters+"/"+$scope.adapterBundles+"/"+$scope.serviceBundles+"/"+$scope.releases+"/"+$scope.versions+"/"+$scope.environments+"/"+$scope.vtierhostnames+"/"+"env_config_filters.json";
    	 environmentConfigurationFilterService.loadComboBox($scope,$rootScope,$http,url,$location.path());
	 };
	 
	 
	 $rootScope.getEnvConfigGlobalFilterModel = function(model)
	 {
		 
		 	
		 if("Apadaters"==model)
		 {
			 return $rootScope.getModelObject($rootScope.getGlobalURLFilter("adapters"));			 
		 }
		 else if("AdapterBundles"==model)
		 {
			return $rootScope.getModelObject($rootScope.getGlobalURLFilter("adapterBundles"));
		 }
		 else if("ServiceBundles"==model)
		 {
			return $rootScope.getModelObject($rootScope.getGlobalURLFilter("serviceBundles"));
		 }
		 else if("Releases"==model)
		 {
			return $rootScope.getModelObject($rootScope.getGlobalURLFilter("releases"));
		 }
		 else if("Version"==model)
		 {
			return $rootScope.getModelObject($rootScope.getGlobalURLFilter("versions"));
		 }
		 else if("Environments"==model)
		 {
			return $rootScope.getModelObject($rootScope.getGlobalURLFilter("environments"));
		 }
		 else if("Vtierhostnames"==model)
		 {
			return $rootScope.getModelObject($rootScope.getGlobalURLFilter("vtierhostnames"));
		 }
		 
		 
	 };
	
	 $rootScope.getEnvConfigFilterModel = function(model)
	 {
		 if("Adapters"==model)
		 {
			 return $scope.adaptersEnvConfigModel;			 
		 }
		 else if("AdapterBundles"==model)
		 {
			return $scope.adapterBundlesEnvConfigModel;	
			
		 }else if("ServiceBundles" == model )
		 {			 
			 return $scope.serviceBundlesEnvConfigModel;	
			 
		 }
		 else if("Releases"==model)
		 {
			return $scope.releasesEnvConfigModel;	
			
		 }
		 else if("Versions"==model)
		 {
			return $scope.versionsEnvConfigModel;	
			
		 }
		 else if("Environments"==model)
		 {
			return $scope.environmentsEnvConfigModel;	
			
		 }
		 else if("Vtierhostnames"==model)
		 {
			return $scope.vtierhostnamesEnvConfigModel;	
			
		 }
		 
	 };
	 
	 
	 
	 $rootScope.getEnvConfigFilterData = function(model)
	 {
		 if("Environments"==model)
		 {
			return $scope.environmentsEnvConfigData;	
			
		 }
		 
		 
	 };
	 
	 
	 $rootScope.getEnvConfigURLFilter= function(model)
	 {
		 if("Adapters"==model)
		 {
			 return $scope.adapters;			 
		 }
		 else if("AdapterBundles"==model)
		 {
			return $scope.adapterBundles;
		 }
		 else if("ServiceBundles"==model)
		 {
			return $scope.serviceBundles;
		 }
		 else if("Releases"==model)
		 {
			return $scope.releases;
		 }
		 else if("Versions"==model)
		 {
			return $scope.versions;
		 }
		 else if("Environments"==model)
		 {
			return $scope.environments;
		 }
		 else if("Vtierhostnames"==model)
		 {
			return $scope.vtierhostnames;
		 }
		 
	 };
	 
	 
	 $rootScope.resetEnvConfigFilters = function()
	 {
		 $rootScope.urlparams=null;
		 environmentConfigurationFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
		 $rootScope.resetGlobalFilterValues();
		 $scope.resetComboBox();		 
		 $rootScope.submitEnvConfigSearch();
	 };
	 
	 $scope.resetComboBox= function() 
	 {
		 var url = "/api360-service/environment_configuration/lookup/"+$scope.adapters+"/"+$scope.adapterBundles+"/"+$scope.serviceBundles+"/"+$scope.releases+"/"+$scope.versions+"/"+$scope.environments+"/"+$scope.vtierhostnames+"/"+"env_config_filters.json";
		 $rootScope.loadEnvConfigComboBox($scope,$rootScope,$http,url,$location.path());         
	 };
	 	
	 $rootScope.ReLoadEnvConfigComboBox= function(name, value) 
	 {
		 environmentConfigurationFilterService.dashboardFilterReload($scope,$rootScope,name, value); 
		 var url = "/api360-service/environment_configuration/lookup/"+$scope.adapters+"/"+$scope.adapterBundles+"/"+$scope.serviceBundles+"/"+$scope.releases+"/"+$scope.versions+"/"+$scope.environments+"/"+$scope.vtierhostnames+"/"+"env_config_filters.json";		 
		 environmentConfigurationFilterService.reloadComboBoxEnvConfig($scope,$rootScope,$http,url,name);		
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