'use strict';


function FunctionTestResultFiltersCtrl($scope,$rootScope, $resource, $http, $location,functionalTestResultFilterService) 
{
	
	if(!jQuery.isEmptyObject($location.search()))
	{
		$rootScope.urlapp = $location.search().app;		
		$rootScope.urlparams = $location.search();
	}	
	
	$rootScope.pageLoaction="";	
		
	$rootScope.emailLink= function()
	{
		var params = 'app='+$location.path().replace("/","");
		
		params = params +  '&APIs=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultFilterModel("APIs"));
		params = params +  '&Backends=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultFilterModel("Backends"));
		params = params +  '&PMTs=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultFilterModel("PMTs"));
		params = params +  '&Release=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultFilterModel("Release"));
		params = params +  '&Bundles=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultFilterModel("Bundles"));
		params = params +  '&PIDs=' + $scope.getCommaSeparatedString($rootScope.getFunTestResultFilterModel("PIDs"));
		
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
	
	
     $rootScope.loadFunctionalTestResultComboBox= function() 
	 {
    	 functionalTestResultFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
    	 functionalTestResultFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);
    	 
    	 		var params = 'api=' +$scope.api+ 			 
							 '&backend=' + $scope.backend+
							 '&pmt=' + $scope.pmt+
							 '&release=' + $scope.release+
    	 		             '&bundle=' + $scope.bundle+
    	 		             '&pid=' + $scope.pid;
						 
    	 
    	  var url = "/api360-service/functional-test/filters/lookup/test-result-filters.json?"+params ;
    	
    	  
    	  functionalTestResultFilterService.loadComboBox($scope,$rootScope,$http,url,$location.path());
	 };
	 
	 
	 $rootScope.getFunTestResultGlobalFilterModel = function(model)
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
		 }else if("PMTs"==model)
		 {
				return $scope.pmtfunctionTestResultModel;	
	     }
		 else if("Release"==model)
		 {
			return $scope.releasefunctionTestResultModel;		
		 }else if("PIDs"==model)
		 {
				return $scope.pidfunctionTestResultModel;	
	     }
		 
		 
		 
		 
		 
		 	
		 /*if("APIs"==model)
		 {
			 return $scope.apifunctionTestResultModel;		
		 }
		 else if("Backends"==model)
		 {
			return $scope.backendfunctionTestResultModel;	
		 }
		 else if("PMTs"==model)
		 {
			return $scope.pmtfunctionTestResultModel;	
		 }
		 else if("Release"==model)
		 {
			return $scope.releasefunctionTestResultModel;		
		 }else if("Bundles"==model)
		 {
			 return $scope.bundlefunctionTestResultModel;	
		 }*/
		
		 
		 
	 };
	
	 $rootScope.getFunTestResultFilterModel = function(model)
	 {
		 if("APIs"==model)
		 {
			 return $scope.apifunctionTestResultModel;			 
		 }
		 else if("Backends"==model)
		 {
			return $scope.backendfunctionTestResultModel;	
			
		 }else if("PMTs" == model )
		 {			 
			 return $scope.pmtfunctionTestResultModel;	
			 
		 }
		 else if("Release"==model)
		 {
			return $scope.releasefunctionTestResultModel;	
			
		 }else if("Bundles"==model)
		 { 
			                  
				return $scope.bundlefunctionTestResultModel;	
				
		 }else if("PIDs" == model )
		 {			 
			 return $scope.pidfunctionTestResultModel;	
			 
		 }
	 };
	 
	 
	 $rootScope.getFunTestResultURLFilter= function(model)
	 {
		 if("APIs"==model)
		 {
			 return $scope.api;			 
		 }
		 else if("Backends"==model)
		 {
			return $scope.backend;
		 }
		 else if("PMTs"==model)
		 {
			return $scope.pmt;
		 }
		 else if("Release"==model)
		 {
			return $scope.release;
			
		 }else if("Bundles"==model)
		 {
				return $scope.bundle ;
				
		 }
		 else if("PIDs"==model)
		 {
			return $scope.pid;
		 }
	 };
	 
	 
	 $rootScope.resetFunctionalTestResultFilters = function()
	 {
		 $rootScope.urlparams=null;
		 functionalTestResultFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
		 $rootScope.resetGlobalFilterValues();
		 $scope.resetComboBox();		 
		 $rootScope.submitFunctionalTestResultSearch();
	 };
	 
	 $scope.resetComboBox= function() 
	 {
			var params = 'api=' +$scope.api+ 			 
			 '&backend=' + $scope.backend+
			 '&pmt=' + $scope.pmt+
			 '&release=' + $scope.release+
             '&bundle=' + $scope.bundle+
             '&pid=' + $scope.pid;
	 

          var url = "/api360-service/functional-test/filters/lookup/test-result-filters.json?"+params ;       
		 
		 
		 $rootScope.loadFunctionalTestResultComboBox($scope,$rootScope,$http,url,$location.path());         
	 };
	 	
	 $rootScope.ReLoadFunTestResultComboBox= function(name, value) 
	 {
		 
		 
		 functionalTestResultFilterService.dashboardFilterReload($scope,$rootScope,name, value); 
		
		 var params = 'api=' +$scope.api+ 			 
			 '&backend=' + $scope.backend+
			 '&pmt=' + $scope.pmt+
			 '&release=' + $scope.release+
             '&bundle=' + $scope.bundle+
             '&pid=' + $scope.pid;
	 

          var url = "/api360-service/functional-test/filters/lookup/test-result-filters.json?"+params ;       
		 
		 
          functionalTestResultFilterService.reloadComboBoxFunTestResult($scope,$rootScope,$http,url,name);		
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