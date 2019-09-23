'use strict';


function InstalledBundleVersionFiltersCtrl($scope,$rootScope, $resource, $http, $location,installedBundleVersionFilterService) 
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
		params = params +  '&version=0';
		params = params +  '&Bundles=' + $scope.getCommaSeparatedString($rootScope.getInstalledBundleFilterModel("Bundles"));
		params = params +  '&Environments=' + $scope.getCommaSeparatedString($rootScope.getInstalledBundleFilterModel("Environments"));
		
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
	
	
     $rootScope.InstalledBundleloadComboBox= function() 
	 {
    	installedBundleVersionFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope); 
    	installedBundleVersionFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);
    	
    	var url = "/api360-service/filter/lookup/"+$scope.bundle+"/"+$scope.environment+"/allinstalledbundlefilters.json";
    	installedBundleVersionFilterService.loadComboBox($scope,$rootScope,$http,url,$location.path());
	 };
	 
	 
	
	 
	 
	 $rootScope.getInstalledBundleFilterModel = function(model)
	 {
		
		 if("Bundles"==model)
		 {
			 return $scope.bundleInstalledBundleModel;
		 } 		 
		 
		 if("Environments"==model)
		 {
			 return $scope.bundleInstalledEnvironmentModel;
		 } 
	 };
	 
	 
	 
	 
	 $rootScope.getInstalledBundleGlobalFilterModel = function(model)
	 {
		 
		 if("Bundles"==model)
		 {
			 return $rootScope.getModelObject($rootScope.getGlobalURLFilter("Bundles"));
		 }
		 else if("Environments"==model)
		 {
				return $scope.bundleInstalledEnvironmentModel;
		 }
	 };
	 
	 
	 $rootScope.geInstalledBundleURLFilter= function(model)
	 {
		if("Bundles"==model)
		 {
			 return $scope.bundle;
		 }	
		 else if("Environments"==model)
		 {
			return $scope.environment;
		 }
	 };
	 
	 
	 $rootScope.resetInstalledBundleFilters = function()
	 {
		 $rootScope.urlparams=null;
		 installedBundleVersionFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
		 $rootScope.resetGlobalFilterValues();
		 $scope.resetComboBox();		 
		 $rootScope.submitInstalledBundleSearch();
	 };
	 
	 $scope.resetComboBox= function() 
	 {
         var url = "/api360-service/filter/lookup/"+$scope.bundle+"/"+$scope.environment+"/allinstalledbundlefilters.json";
         $rootScope.InstalledBundleloadComboBox($scope,$rootScope,$http,url,$location.path());         
	 };
	 
	 	 
		
	 $rootScope.ReLoadInstalledBundleComboBox= function(name, value) 
	 {
		 installedBundleVersionFilterService.dashboardFilterReload($scope,$rootScope,name, value); 
		 var url = "/api360-service/filter/lookup/"+$scope.bundle+"/"+$scope.environment+"/allinstalledbundlefilters.json";
		 installedBundleVersionFilterService.reloadComboBoxInstalledBundle($scope,$rootScope,$http,url,name);	
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