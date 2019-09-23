'use strict';


function EteTestResultFiltersCtrl($scope,$rootScope, $resource, $http, $location,eteTestResultFilterService) 
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
		
		params = params +  '&Testnames=' + $scope.getCommaSeparatedString($rootScope.getEteTestResultFilterModel("Testnames"));
		params = params +  '&Releases=' + $scope.getCommaSeparatedString($rootScope.getEteTestResultFilterModel("Releases"));
		params = params +  '&PMTs=' + $scope.getCommaSeparatedString($rootScope.getEteTestResultFilterModel("PMTs"));
		params = params +  '&PIDs=' + $scope.getCommaSeparatedString($rootScope.getEteTestResultFilterModel("PIDs"));
		
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
	
	
     $rootScope.loadEteTestResultComboBox= function() 
	 {
    	 eteTestResultFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
    	 eteTestResultFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);
    	 
    	 		var params = 'testname=' +$scope.testname+ 			 
							 '&release=' + $scope.release+
							 '&pmt=' + $scope.pmt+
    	 		             '&pid=' + $scope.pid;
						 
    	 
    	  var url = "/api360-service/ete-test/filters/lookup/test-result-filters.json?"+params ;
    	
    	  
    	  eteTestResultFilterService.loadComboBox($scope,$rootScope,$http,url,$location.path());
	 };
	 
	 
	 $rootScope.getEteTestResultGlobalFilterModel = function(model)
	 {
		 
		 
		 if("Testnames"==model)
		 {
			return $scope.testnameEteTestResultModel;
		 }	
		 else if("Releases"==model)
		 {
			return $scope.releaseEteTestResultModel;		 
		 }
		 else if("PMTs"==model)
		 {
			return $scope.pmtEteTestResultModel;	
	     }
		 else if("PIDs"==model)
		 {
			return $scope.pidEteTestResultModel;	
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
	
	 $rootScope.getEteTestResultFilterModel = function(model)
	 {
		 if("Testnames"==model)
		 {
			 return $scope.testnameEteTestResultModel;			 
		 }
		 else if("Releases"==model)
		 {
			return $scope.releaseEteTestResultModel;	
			
		 }else if("PMTs" == model )
		 {			 
			 return $scope.pmtEteTestResultModel;	
			 
		 }
		 else if("PIDs" == model )
		 {			 
			 return $scope.pidEteTestResultModel;	
			 
		 }
	 };
	 
	 
	 $rootScope.getEteTestResultURLFilter= function(model)
	 {
		 if("Testnames"==model)
		 {
			 return $scope.testname;			 
		 }
		 else if("Releases"==model)
		 {
			return $scope.release;
		 }
		 else if("PMTs"==model)
		 {
			return $scope.pmt;
		 }
		 else if("PIDs"==model)
		 {
			return $scope.pid;
		 }
	 };
	 
	 
	 $rootScope.resetEteTestResultFilters = function()
	 {
		 $rootScope.urlparams=null;
		 eteTestResultFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
		 $rootScope.resetGlobalFilterValues();
		 $scope.resetComboBox();		 
		 $rootScope.submitDefaultETETestResultSearch();
	 };
	 
	 $scope.resetComboBox= function() 
	 {
			var params = 'testname=' +$scope.testname+ 			 
			 '&release=' + $scope.release+
			 '&pmt=' + $scope.pmt+
             '&pid=' + $scope.pid;
	 

          var url = "/api360-service/ete-test/filters/lookup/test-result-filters.json?"+params ;       
		 
		 
		 $rootScope.loadEteTestResultComboBox($scope,$rootScope,$http,url,$location.path());         
	 };
	 	
	 $rootScope.ReLoadEteTestResultComboBox= function(name, value) 
	 {
		 
		 
		 eteTestResultFilterService.dashboardFilterReload($scope,$rootScope,name, value); 
		
		 var params = 'testname=' +$scope.testname+ 			 
			 '&release=' + $scope.release+
			 '&pmt=' + $scope.pmt+
             '&pid=' + $scope.pid;
	 

          var url = "/api360-service/ete-test/filters/lookup/test-result-filters.json?"+params ;       
		 
		 
          eteTestResultFilterService.reloadComboBoxEteTestResult($scope,$rootScope,$http,url,name);		
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