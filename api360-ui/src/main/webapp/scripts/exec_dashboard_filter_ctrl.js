'use strict';

console.log("ExecDashboardFiltersCtrl.js");
function ExecDashboardFiltersCtrl($scope,$rootScope, $resource, $http, $location,execDashboardFilterService) 
{
	
	if(!jQuery.isEmptyObject($location.search()))
	{
		$rootScope.urlapp = $location.search().app;		
		$rootScope.urlparams = $location.search();
	};	
	
	
	$rootScope.pageLoaction="";	
	execDashboardFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
	
	
	$rootScope.resetDashboardFilterModels= function()
	{
		execDashboardFilterService.emptyFilterModels($scope,$rootScope);
	};
	
	
	$rootScope.emailLink= function()
	{
		
		var params = 'app='+$location.path().replace("/","")
		params = params +  '&version=0';
		params = params + '&Programs=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Programs"));	
		params = params +  '&Clients=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Clients"));	 
		params = params +  '&Profiles=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Profiles"));	
		params = params +  '&Bundles=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Bundles"));	
		params = params +  '&APIs=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("APIs"));	
		params = params +  '&Environments=' + $rootScope.environment;
		params = params +  '&Backends=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Backends")); 
		
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
	
	
     $rootScope.loadDashboardComboBox= function() 
	 {
    	execDashboardFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);         
        var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/allexecdashboardfilters.json";
        execDashboardFilterService.loadComboBox($scope,$rootScope,$http,url,$location.path());
	 };	 
	 
	 $rootScope.getExecDashboardGlobalFilterModel = function(model)
	 {
		 
		 if("Clients"==model)
		 {
			 return $rootScope.getModelObject($rootScope.getGlobalURLFilter("Clients"));
		 }
		 else if("Programs"==model)
		 {
			return $rootScope.getModelObject($rootScope.getGlobalURLFilter("Programs"));
		 }
		 else if("Profiles"==model)
		 {
			 return $rootScope.getModelObject($rootScope.getGlobalURLFilter("Profiles"));
		 }	
		 else if("Bundles"==model)
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
		 else if("Environments"==model)
		 {
			return $scope.environmentExecDashboardModel;
		 }
	 };
	 
	 $rootScope.getDashboardFilterModel = function(model)
	 {
		 
		 if("Clients"==model)
		 {
			 return $scope.clientExecDashboardModel;	
		 }
		 else if("Programs"==model)
		 {
			return $scope.programExecDashboardModel;
		 }
		 else if("Profiles"==model)
		 {
			 return $scope.profileExecDashboardModel;
		 }	
		 else if("Bundles"==model)
		 {
			 return $scope.bundleExecDashboardModel;
		 }	
		 else if("APIs"==model)
		 {
			 return $scope.apiExecDashboardModel;			 
		 }
		 else if("Backends"==model)
		 {
			return $scope.backendExecDashboardModel;
		 }	
		 else if("Environments"==model)
		 {
			return $scope.environmentExecDashboardModel;
		 }		  
	 };
	 
	 
	 $rootScope.getDashboardURLFilter = function(model)
	 {
		 if("Clients"==model)
		 {
			 return $scope.client;	
		 }
		 else if("Programs"==model)
		 {
			return $scope.program;
		 }
		 else if("Profiles"==model)
		 {
			 return $scope.profile;
		 }	
		 else if("Bundles"==model)
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
		 else if("Environments"==model)
		 {
			return $scope.environment;
		 }		  
	 };
	 
	 $rootScope.updateDashboardFilters = function(model,idProp)
	 {
		 
		 if("Clients"==model)
		 {
			 $scope.clientExecDashboardModel.splice(0,$scope.clientExecDashboardModel.length);
			 
			angular.forEach(idProp, function (idPropVal) 
            {
				 $scope.clientExecDashboardModel.push(idPropVal);
            });		 
		 }
		 else if("Programs"==model)
		 {
			 $scope.programExecDashboardModel.splice(0,$scope.programExecDashboardModel.length);
			 
			angular.forEach(idProp, function (idPropVal) 
            {
				 $scope.programExecDashboardModel.push(idPropVal);
            });	
			 
		 }
		 else if("APIs"==model)
		 {
			 $scope.apiExecDashboardModel.splice(0,$scope.apiExecDashboardModel.length);			 
			 
			angular.forEach(idProp, function (idPropVal) 
            {
				 $scope.apiExecDashboardModel.push(idPropVal);
            });	
			 
			 
		 }
		 else if("Backends"==model)
		 {
			 $scope.backendExecDashboardModel.splice(0,$scope.backendExecDashboardModel.length);
			 
			angular.forEach(idProp, function (idPropVal) 
            {
				 $scope.backendExecDashboardModel.push(idPropVal);
            });	
		 }		 
		 
	 };
	 
	 
	 $rootScope.resetDashboardFilters = function()
	 {
		 $rootScope.urlparams=null;
		 $rootScope.resetGlobalFilterValues();
		 execDashboardFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
		 $rootScope.resetDashboardComboBox();		 
		 $rootScope.submitDashboardSearch(true);
	 };
	 
	 $rootScope.resetDashboardComboBox= function() 
	 {
         var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/allexecdashboardfilters.json";
         $rootScope.loadDashboardComboBox($scope,$rootScope,$http,url,$location.path());     
	 };	 
	 	 
		
	 $rootScope.ReLoadDashboardComboBox= function(name, value) 
	 {
		 execDashboardFilterService.dashboardFilterReload($scope,$rootScope,name, value); 
		 var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/allexecdashboardfilters.json";
	     execDashboardFilterService.reloadComboBox($scope,$rootScope,$http,url,name);
	 };
	 
	 $rootScope.ReLoadDashboardFromViewResetComboBox= function(name, value)
	 {
		 var dummyModel=[];
		 var idProp = {idProp: 'id'};
   		 idProp['id'] = value;				    		 
   		 dummyModel.push(idProp);
   		 
		 if("Programs"==name)
         {
			 $scope.program=value;
			 $rootScope.updateDashboardFilters("Programs",dummyModel);
         }
         
         if("Clients"==name)
         {
        	 $scope.client=value; 
        	 $rootScope.updateDashboardFilters("Clients",dummyModel);
         }
         
         if("APIs"==name)
         {
        	 $scope.api=value;
        	 $rootScope.updateDashboardFilters("APIs",dummyModel);
         }
         
         if("Backends"==name)
         {
        	 $scope.backend=value;
        	 $rootScope.updateDashboardFilters("Backends",dummyModel);
         }
         
         execDashboardFilterService.dashboardFilterReload($scope,$rootScope,name, value);	
		 var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/allexecdashboardfilters.json";
		 execDashboardFilterService.reloadComboBox($scope,$rootScope,$http,url,"NA");		 
		 $rootScope.submitDashboardViewSearch(name,value);
	 };
	 
	 
	 $rootScope.ReLoadDashboardFromViewComboBox= function(name, value)
	 {
		 execDashboardFilterService.dashboardFilterReload($scope,$rootScope,name, value);	
		 var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/allexecdashboardfilters.json";
		 execDashboardFilterService.reloadComboBox($scope,$rootScope,$http,url,name);		 
		 $rootScope.submitDashboardViewSearch(name,value);
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