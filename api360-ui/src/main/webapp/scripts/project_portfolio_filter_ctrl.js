'use strict';


function ProjectPortfolioFiltersCtrl($scope,$rootScope, $resource, $http, $location,projectPortfolioFilterService) 
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
		params = params + '&Programs=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioFilterModel("Programs"));
		params = params +  '&Bundles=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioFilterModel("Bundles"));
		params = params +  '&APIs=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioFilterModel("APIs"));		
		params = params +  '&Backends=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioFilterModel("Backends"));
		params = params +  '&Release=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioFilterModel("Release"));
		params = params +  '&PID=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioFilterModel("PID"));
			
		
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
	
	
     $rootScope.loadProjectPortfolioComboBox= function() 
	 {
    	 projectPortfolioFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
    	 projectPortfolioFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);
    	 var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.pid+"/"+$scope.release+"/"+$scope.program+"/allPortfoliofilters.json";
    	 
    	 
		 projectPortfolioFilterService.loadComboBox($scope,$rootScope,$http,url,$location.path());
	 };
	 
	 
	 $rootScope.getProjectPortfolioGlobalFilterModel = function(model)
	 {
		 
		 if("Bundles"==model)
		 {
			 return $rootScope.getModelObject($rootScope.getGlobalURLFilter("Bundles"));
		 }	
		 else if("APIs"==model)
		 {
			 return $rootScope.getModelObject($rootScope.getGlobalURLFilter("APIs"));			 
		 }
		 else if("Backends"==model)
		 {
			return $rootScope.getModelObject($rootScope.getGlobalURLFilter("Backends"));
		 }
		 else if("Release"==model)
		 {
			return $scope.releaseProjectPortfolioModel;
		 }
		 else if("PID"==model)
		 {
				return $scope.pidProjectPortfolioModel;
		 }else if("Programs"==model)
		 {
				return $rootScope.getModelObject($rootScope.getGlobalURLFilter("Programs"));
		 }
		 
	 };
	 
	 $rootScope.getProjectPortfolioFilterModel = function(model)
	 {
		 if("Bundles"==model)
		 {
			 return $scope.bundleProjectPortfolioModel;
		 }	
		 else if("APIs"==model)
		 {
			 return $scope.apiProjectPortfolioModel;			 
		 }
		 else if("Backends"==model)
		 {
			return $scope.backendProjectPortfolioModel;
		 }
		 else if("Release"==model)
		 {
			return $scope.releaseProjectPortfolioModel;
		  }else if("PID"==model)
			  
		  {
			 	return $scope.pidProjectPortfolioModel;
		  }else if("Programs"==model)
		  {
			 
			 return $scope.programProjectPortfolioModel;
		  }
	 };
	 
	 
	 $rootScope.getProjectPortfolioURLFilter= function(model)
	 {
		 if("Bundles"==model)
		 {
			 return $scope.bundle;
		 }	
		 else if("APIs"==model)
		 {
			 return $scope.api;			 
		 }
		 else if("Backends"==model)
		 {
			return $scope.backend;
		 }
		 else if("Release"==model)
		 {
			return $scope.release;
		 }
		 else if("PID"==model)
		 {
				return $scope.pid;
		 }else if("Programs"==model)
		 {
				return $scope.program;
		}
	 };
	 
	 
	 $rootScope.resetProjectPortfolioFilters = function()
	 {
		 $rootScope.urlparams=null;
		 projectPortfolioFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
		 $rootScope.resetGlobalFilterValues();
		 $scope.resetComboBox();		 
		 $rootScope.submitProjectPortfolioSearch();
	 };
	 
	 $scope.resetComboBox= function() 
	 {
		 var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.pid+"/"+$scope.release+"/"+$scope.program+"/allPortfoliofilters.json";
         $rootScope.loadProjectPortfolioComboBox($scope,$rootScope,$http,url,$location.path());         
	 };
	 	
	 $rootScope.ReLoadProjectPortFolioComboBox= function(name, value) 
	 {
		 projectPortfolioFilterService.dashboardFilterReload($scope,$rootScope,name, value); 
		 var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.pid+"/"+$scope.release+"/"+$scope.program+"/allPortfoliofilters.json";
		 projectPortfolioFilterService.reloadComboBoxProjectPortfolio($scope,$rootScope,$http,url,name);		
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