'use strict';


function APIArtifactFilterCtrl($scope,$rootScope, $resource, $http, $location,apiartifactFilterService) 
{
	
	if(!jQuery.isEmptyObject($location.search()))
	{
		$rootScope.urlapp = $location.search().app;		
		$rootScope.urlparams = $location.search();
	}
	
	
	$rootScope.emailLink= function()
	{
		var params = 'app='+$location.path().replace("/","")
	    params = params +  '&APIs=' + $scope.getCommaSeparatedString($rootScope.getAPIArtifactFilterModel("APIs"));
		params = params +  '&Bundles=' + $scope.getCommaSeparatedString($rootScope.getAPIArtifactFilterModel("Bundles"));		
		params = params +  '&Versions=' + $scope.getCommaSeparatedString($rootScope.getAPIArtifactFilterModel("Versions"));
		
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
	
	
     $rootScope.loadAPIArtifactComboBox= function() 
	 {
    	 apiartifactFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope); 
    	 apiartifactFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);
    	
    	   var params =	 'api=' +$scope.api+ 			 
						 '&bundle=' + $scope.bundle+
						 '&version=' + $scope.version;


    	   var url = "/api360-service/apiartifact/filters/lookup/api-artifact-filters.json?"+params;
   	
    	   apiartifactFilterService.loadComboBox($scope,$rootScope,$http,url,$location.path());
	 };
	 
	 
	
	 
	 
	 $rootScope.getAPIArtifactFilterModel = function(model)
	 {
		
		 if("Bundles"==model)
		 {
			 return $scope.bundleAPIArtifactModel;
		 } 		 
		 
		 if("Versions"==model)
		 {
			 return $scope.versionAPIArtifactModel;
		 }
		 if("APIs"==model)
		 {
			 return $scope.apiAPIArtifactModel;
		 }
	 };
	 
	 
	 
	 
	 $rootScope.getAPIArtifactFilterGlobalFilterModel = function(model)
	 {
		 
		 if("Bundles"==model)
		 {
			 return $scope.bundleAPIArtifactModel;
		 } 		 
		 
		 if("Versions"==model)
		 {
			 return $scope.versionAPIArtifactModel;
		 }
		 if("APIs"==model)
		 {
			 return $scope.apiAPIArtifactModel;
		 }
	 };
	 
	 
	 $rootScope.getAPIArtifactFilterURLFilter= function(model)
	 {
		 if("Bundles"==model)
		 {
			 return $scope.bundle;
		 } 		 
		 
		 if("Versions"==model)
		 {
			 return $scope.version;
		 }
		 if("APIs"==model)
		 {
			 return $scope.api;
		 }
	 };
	 
	 
	 $rootScope.resetAPIArtifactFilters = function()
	 {
		 $rootScope.urlparams=null;
		 apiartifactFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
		 $rootScope.resetGlobalFilterValues();
		 $scope.resetComboBox();		 
		 $rootScope.submitAPIArtifactSearch();
	 };
	 
	 $scope.resetComboBox= function() 
	 {
		 var params =	 'api=' +$scope.api+ 			 
		 '&bundle=' + $scope.bundle+
		 '&version=' + $scope.version;

           var url = "/api360-service/apiartifact/filters/lookup/api-artifact-filters.json?"+params;
         $rootScope.loadAPIArtifactComboBox($scope,$rootScope,$http,url,$location.path());         
	 };
	 
	 	 
		
	 $rootScope.ReLoadAPIArtifactComboBox= function(name, value) 
	 {
		 apiartifactFilterService.dashboardFilterReload($scope,$rootScope,name, value); 
		  var params =	 'api=' +$scope.api+ 			 
		 '&bundle=' + $scope.bundle+
		 '&version=' + $scope.version;

           var url = "/api360-service/apiartifact/filters/lookup/api-artifact-filters.json?"+params;
		 apiartifactFilterService.reloadComboBoxApiArtifact($scope,$rootScope,$http,url,name);	
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