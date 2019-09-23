'use strict';


function FiltersCtrl($scope,$rootScope, $resource, $http, $location,commonService) 
{
	
	if(!jQuery.isEmptyObject($location.search()))
	{
		$rootScope.urlapp = $location.search().app;		
		$rootScope.urlparams = $location.search();
	}	
	
	
	$rootScope.hideAllFilters= function()
	{
		$rootScope.programsDropDown=true;
		$rootScope.clientsDropDown=true;
		$rootScope.profilesDropDown=true;
		$rootScope.backendsDropDown=true;
		$rootScope.bundlesDropDown=true;
		$rootScope.apisDropDown=true;
		$rootScope.environmentsDropDown=true;
		$rootScope.releaseDropDown=true;
		$rootScope.pidDropDown=true;
		$rootScope.federatedDropDown=true;
		$rootScope.apitoapiDropDown=true;
		$rootScope.subProcessDropDown=true;
		
	};
	
	
	$rootScope.pageLoaction="";	
	commonService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
	
	$rootScope.emailLink= function()
	{
		
		var params = 'app='+$location.path().replace("/","")
		params = params +  '&version=0';
		
		
		if($rootScope.programsDropDown==false)
		{
			params = params + '&Programs=' + $scope.getCommaSeparatedString($rootScope.getFilterModel("Programs"));
		}
			
		if($rootScope.clientsDropDown==false)
		{
			params = params +  '&Clients=' + $scope.getCommaSeparatedString($rootScope.getFilterModel("Clients"));
		}
		
		if($rootScope.profilesDropDown==false)
		{ 
			params = params +  '&Profiles=' + $scope.getCommaSeparatedString($rootScope.getFilterModel("Profiles"));
		}
		 
		if($rootScope.bundlesDropDown==false)
		{
			params = params +  '&Bundles=' + $scope.getCommaSeparatedString($rootScope.getFilterModel("Bundles"));
		}
		 
		if($rootScope.apisDropDown==false)
		{
			params = params +  '&APIs=' + $scope.getCommaSeparatedString($rootScope.getFilterModel("APIs"));
		}
		  
		if($rootScope.environment!=undefined)
		{
			params = params +  '&Environments=' + $rootScope.environment;
		}
		 
		if($rootScope.backendsDropDown==false)
		{
			params = params +  '&Backends=' + $scope.getCommaSeparatedString($rootScope.getFilterModel("Backends"));
		}
		 
		if($rootScope.releaseDropDown==false)
		{
			params = params +  '&Release=' + $scope.getCommaSeparatedString($rootScope.getFilterModel("Release"));
		}
		
		if($rootScope.pidDropDown==false)
		{
			params = params +  '&PID=' + $scope.getCommaSeparatedString($rootScope.getFilterModel("PID"));
		}
		
		
		if($rootScope.federatedDropDown==false)
		{
			params = params +  '&Federated=' + $scope.getCommaSeparatedString($rootScope.getFilterModel("Federated"));
		}
		
		
		if($rootScope.apitoapiDropDown==false)
		{
			params = params +  '&ApiToApi=' + $scope.getCommaSeparatedString($rootScope.getFilterModel("ApiToApi"));
		}
		
		
		if($rootScope.subProcessDropDown==false)
		{
			params = params +  '&SubProcess=' + $scope.getCommaSeparatedString($rootScope.getFilterModel("SubProcess"));
		}
				
		
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
	
	
     $rootScope.loadComboBox= function() 
	 {
    	
    	 if("/dashboard"==$location.path() || $rootScope.urlapp=="dashboard")
		 {
        	 commonService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);         
             var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/"+$scope.federated+"/"+$scope.apitoapi+"/"+$scope.subprocess+"/allfilters.json";
             commonService.loadComboBox($scope,$rootScope,$http,url,$location.path());		 
		  }
		  else if("/api_portfolio"==$location.path() || $rootScope.urlapp=="api_portfolio")
		  {
			    commonService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);         
		         var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/"+$scope.federated+"/"+$scope.apitoapi+"/"+$scope.subprocess+"/allfilters.json";
		         commonService.loadComboBox($scope,$rootScope,$http,url,$location.path());	
		  }
		  else if("/project_portfolio"==$location.path() || $rootScope.urlapp=="project_portfolio")
		  {
			     commonService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);         
		         var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.pid+"/"+$scope.release+"/allPortfoliofilters.json";
		         commonService.loadComboBoxForProjectPortfolio($scope,$rootScope,$http,url,$location.path());	
		  }
		  else if("/installed_bundle_versions"==$location.path() || $rootScope.urlapp=="installed_bundle_versions")
		  {
			     commonService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);         
		         var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/"+$scope.federated+"/"+$scope.apitoapi+"/"+$scope.subprocess+"/allfilters.json";
		         commonService.loadComboBox($scope,$rootScope,$http,url,$location.path());	
		  }
		  else
		  {
			  commonService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);         
	          var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/"+$scope.federated+"/"+$scope.apitoapi+"/"+$scope.subprocess+"/allfilters.json";
	          commonService.loadComboBox($scope,$rootScope,$http,url,$location.path());
		  }
	 };
	 
	 
	 
	 $rootScope.getFilterModel = function(model)
	 {
		 
		 if("Clients"==model)
		 {
			 return $scope.clientModel;	
		 }
		 else if("Programs"==model)
		 {
			return $scope.programModel;
		 }
		 else if("Profiles"==model)
		 {
			 return $scope.profileModel;
		 }	
		 else if("Bundles"==model)
		 {
			 return $scope.bundleModel;
		 }	
		 else if("APIs"==model)
		 {
			 return $scope.apiModel;			 
		 }
		 else if("Backends"==model)
		 {
			return $scope.backendModel;
		 }	
		 else if("Environments"==model)
		 {
			return $scope.environmentModel;
		 }else if("Release"==model)
		 {
				return $scope.releaseModel;
		  }else if("PID"==model)
		  {
				return $scope.pidModel;
		  }else if("Federated"==model)
		  {
				return $scope.federatedModel;
		  }else if("ApiToApi"==model)
		  {
				return $scope.apitoapiModel;
		  }else if("SubProcess"==model)
		  {
				return $scope.subprocessModel;
		  }
		  
	 };
	 
	 $rootScope.updateFilters = function(model,idProp)
	 {
		 
		 if("Clients"==model)
		 {
			 $scope.clientModel.splice(0,$scope.clientModel.length);
			 $scope.clientModel.push(idProp);			 
		 }
		 else if("Programs"==model)
		 {
			 $scope.programModel.splice(0,$scope.programModel.length);
			 $scope.programModel.push(idProp);
		 }
		 else if("APIs"==model)
		 {
			 $scope.apiModel.splice(0,$scope.apiModel.length);
			 $scope.apiModel.push(idProp);
			 
		 }
		 else if("Backends"==model)
		 {
			 $scope.backendModel.splice(0,$scope.backendModel.length);
			 $scope.backendModel.push(idProp);
		 }		 
		 
	 };
	 
	 
	 $rootScope.resetFilters = function()
	 {
		 $rootScope.urlparams=null;
		 commonService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
		 $rootScope.resetComboBox();		 
		 $rootScope.submitSearch(true);
	 };
	 
	 $rootScope.resetComboBox= function() 
	 {
         var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/"+$scope.federated+"/"+$scope.apitoapi+"/"+$scope.subprocess+"/allfilters.json";
         $rootScope.loadComboBox($scope,$rootScope,$http,url,$location.path());         
	 };
	 
	 	 
		
	 $rootScope.ReLoadComboBox= function(name, value) 
	 {
		 
		 commonService.dashboardFilterReload($scope,$rootScope,name, value); 
		 
		  if("/dashboard"==$location.path())
		  {
			 
			  var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/"+$scope.federated+"/"+$scope.apitoapi+"/"+$scope.subprocess+"/allfilters.json";
			  commonService.reloadComboBox($scope,$rootScope,$http,url,name);		 
		  }
		  else if("/api_portfolio"==$location.path())
		  {
			  
			  var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/"+$scope.federated+"/"+$scope.apitoapi+"/"+$scope.subprocess+"/allfilters.json";
			  commonService.reloadComboBox($scope,$rootScope,$http,url,name);
		  }
		  else if("/project_portfolio"==$location.path())
		  {
			   
			  var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.pid+"/"+$scope.release+"/allPortfoliofilters.json";
			  commonService.reloadComboBoxProjectPortfolio($scope,$rootScope,$http,url,name);
		  }
		  else if("/installed_bundle_versions"==$location.path())
		  {
			   
			  var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/"+$scope.federated+"/"+$scope.apitoapi+"/"+$scope.subprocess+"/allfilters.json";
			  commonService.reloadComboBox($scope,$rootScope,$http,url,name);
		  }
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