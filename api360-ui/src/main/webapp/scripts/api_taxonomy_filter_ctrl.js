'use strict';


function APITaxonomyFiltersCtrl($scope,$rootScope, $resource, $http, $location,apiTaxonomyFilterService) 
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
		params = params +  '&LBGUPS=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("LBGUPS"));
		params = params +  '&Bundles=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("Bundles"));
		params = params +  '&APIs=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("APIs"));
		params = params +  '&Domains=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("Domains"));
		params = params +  '&BusinessTracks=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("BusinessTracks"));
		params = params +  '&BusinessNames=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("BusinessNames"));
		params = params +  '&FunctionalModelLevel1=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("FunctionalModelLevel1"));
		params = params +  '&FunctionalModelLevel2=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("FunctionalModelLevel2"));
		params = params +  '&FunctionalModelLevel3=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("FunctionalModelLevel3"));
		params = params +  '&FunctionalModelLevel4=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("FunctionalModelLevel4"));
		
		var protocol = $location.protocol();
		var host = $location.host();
		var port = $location.port();
		var path = "otherwise";
		
		var url = protocol+"://"+host+":"+port+"/api360-ui/#/"+path+"?"+escape(params);
				
		var link = "mailto:"+ $rootScope.loginuser
        + "?subject=API360 Email as link"		
        + "&body="+url;
		
		
		window.location.href = link;
	};
	
	
     $rootScope.APITaxonomyloadComboBox= function() 
	 {
    	 apiTaxonomyFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
    	 apiTaxonomyFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);
    	// var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.bundle+"/"+$scope.doamin+"/"+$scope.businesstrack+"/"+$scope.businessname+"/"+$scope.functional+"/"+$scope.lbgups+"/api_taxonomy_filters.json";
    	 
    	 
    	 var params =	 'application=' +$scope.api+ 			 
						 '&bundle=' + $scope.bundle+
						 '&domain=' + $scope.doamin+
						 '&business_name=' + $scope.businessname+
						 '&business_track=' + $scope.businesstrack+
						 '&lbgups=' + $scope.lbgups+
						 '&functional_model1=' + encodeURIComponent($scope.funlevel1)+
						 '&functional_model2=' + encodeURIComponent($scope.funlevel2)+
						 '&functional_model3=' + encodeURIComponent($scope.funlevel3)+
						 '&functional_model4=' + encodeURIComponent($scope.funlevel4);
	       var url = "/api360-service/filter/lookup/api_taxonomy_filters.json?"+params ;
    	 
    	 
    	 
    	 
    	 
    	 apiTaxonomyFilterService.loadComboBox($scope,$rootScope,$http,url,$location.path());    	 
	 };
	 
	 
	 
	 $rootScope.getAPITaxonomyGlobalFilterModel = function(model)
	 {
		
		 
		 if("LBGUPS"==model)
		 {
			 return $scope.lbgupsAPITaxonomyModel;
		 }	
		 else if("Domains"==model)
		 {
			 return $scope.domainAPITaxonomyModel;
		 }	
		 else if("APIs"==model)
		 {
			 return $rootScope.getModelObject($rootScope.getGlobalURLFilter("APIs"));
		 }
		 else if("BusinessTracks"==model)
		 {
			return $scope.businesstrackesAPITaxonomyModel;
		 }	
		 else if("Bundles"==model)
		 {
			 return $rootScope.getModelObject($rootScope.getGlobalURLFilter("Bundles"));
			
		 }else if("BusinessNames"==model)
		 {
			return $scope.businessnameAPITaxonomyModel;
		 }else if("FunctionalModelLevel1"==model)
		 {
				return $scope.funlevel1APITaxonomyModel;
		 }
		 else if("FunctionalModelLevel2"==model)
		 {
				return $scope.funlevel2APITaxonomyModel;
		 }	
		 else if("FunctionalModelLevel3"==model)
		 {
				return $scope.funlevel3APITaxonomyModel;
		 }	
		 else if("FunctionalModelLevel4"==model)
		 {
				return $scope.funlevel4APITaxonomyModel;
		 }	
		 
		 
	 };
	 
	 
	 
	 $rootScope.getAPITaxonomyURLFilter = function(model)
	 {
		 if("LBGUPS"==model)
		 {
			 return $scope.lbgups;
		 }	
		 else if("Domains"==model)
		 {
			 return $scope.doamin;
		 }	
		 else if("APIs"==model)
		 {
			 return $scope.api;			 
		 }
		 else if("BusinessTracks"==model)
		 {
			return $scope.businesstrack;
		 }	
		 else if("Bundles"==model)
		 {
			return $scope.bundle;
			
		 }else if("BusinessNames"==model)
		  {
				return $scope.businessname;
		  }
		 else if("FunctionalModelLevel1"==model)
			 {
				return $scope.funlevel1;
		 }
		 else if("FunctionalModelLevel2"==model)
		 {
				return $scope.funlevel2;
		 }	
		 else if("FunctionalModelLevel3"==model)
		 {
				return $scope.funlevel3;
		 }	
		 else if("FunctionalModelLevel4"==model)
		 {
				return $scope.funlevel4;
		 }	  
	 };
	 
	 
	
	 $rootScope.getAPITaxonomyFilterModel = function(model)
	 {
			
		  if("LBGUPS"==model)
		 {
			 return $scope.lbgupsAPITaxonomyModel;
		 }	
		 else if("Domains"==model)
		 {
			 return $scope.domainAPITaxonomyModel;
		 }	
		 else if("APIs"==model)
		 {
			 return $scope.apiAPITaxonomyModel;			 
		 }
		 else if("BusinessTracks"==model)
		 {
			return $scope.businesstrackesAPITaxonomyModel;
		 }	
		 else if("Bundles"==model)
		 {
			return $scope.bundleAPITaxonomyModel;
		 }else if("BusinessNames"==model)
		  {
				return $scope.businessnameAPITaxonomyModel;
		  }else if("FunctionalModelLevel1"==model)
			 {
				return $scope.funlevel1APITaxonomyModel;
		 }
		 else if("FunctionalModelLevel2"==model)
		 {
				return $scope.funlevel2APITaxonomyModel;
		 }	
		 else if("FunctionalModelLevel3"==model)
		 {
				return $scope.funlevel3APITaxonomyModel;
		 }	
		 else if("FunctionalModelLevel4"==model)
		 {
				return $scope.funlevel4APITaxonomyModel;
		 }	
	 };
	 
	 	 
	 $rootScope.resetAPITaxonomyFilters = function()
	 {
		 $rootScope.urlparams=null;		 
		 apiTaxonomyFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);	
		 $rootScope.resetGlobalFilterValues();			 
		 $scope.resetComboBox();
		 $('#apitaxonomygrid').DataTable().search('').columns().search('').draw();
		 $rootScope.submitAPITaxonomySearch();
		 
	 };
	 
	 $scope.resetComboBox= function() 
	 {
		 //var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.bundle+"/"+$scope.doamin+"/"+$scope.businesstrack+"/"+$scope.businessname+"/"+$scope.functional+"/"+$scope.lbgups+"/api_taxonomy_filters.json";
		 
		 
		 var params =	 'application=' +$scope.api+ 			 
		 '&bundle=' + $scope.bundle+
		 '&domain=' + $scope.doamin+
		 '&business_name=' + $scope.businessname+
		 '&business_track=' + $scope.businesstrack+
		 '&lbgups=' + $scope.lbgups+
		 '&functional_model1=' + encodeURIComponent($scope.funlevel1)+
		 '&functional_model2=' + encodeURIComponent($scope.funlevel2)+
		 '&functional_model3=' + encodeURIComponent($scope.funlevel3)+
		 '&functional_model4=' + encodeURIComponent($scope.funlevel4);
         var url = "/api360-service/filter/lookup/api_taxonomy_filters.json?"+params ;      
		 
		 
         $rootScope.APITaxonomyloadComboBox($scope,$rootScope,$http,url,$location.path());         
	 };
	 
	 $rootScope.ReLoadAPITaxonomyComboBox= function(name, value) 
	 {
		 
		
		 apiTaxonomyFilterService.dashboardFilterReload($scope,$rootScope,name, value);
		// var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.bundle+"/"+$scope.doamin+"/"+$scope.businesstrack+"/"+$scope.businessname+"/"+$scope.functional+"/"+$scope.lbgups+"/api_taxonomy_filters.json";
		 
		 var params =	 'application=' +$scope.api+ 			 
		 '&bundle=' + $scope.bundle+
		 '&domain=' + $scope.doamin+
		 '&business_name=' + $scope.businessname+
		 '&business_track=' + $scope.businesstrack+
		 '&lbgups=' + $scope.lbgups+
		 '&functional_model1=' + encodeURIComponent($scope.funlevel1)+
		 '&functional_model2=' + encodeURIComponent($scope.funlevel2)+
		 '&functional_model3=' + encodeURIComponent($scope.funlevel3)+
		 '&functional_model4=' + encodeURIComponent($scope.funlevel4);
         var url = "/api360-service/filter/lookup/api_taxonomy_filters.json?"+params ;
		 
		 
		 
		 apiTaxonomyFilterService.reloadComboBoxAPITaxonomy($scope,$rootScope,$http,url,name);			 
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
		
		
		
		$scope.getPipeSeparatedString = function(json) 
		{ 
			if(json==undefined || json==null)
			{
				return "All";
			}
			
			var result = "";
			var found =false;
			
			for (var dString in json) 
			{ 
				result += json[dString].id + "|";
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


			var n = result.lastIndexOf("|");
			
			if(parseInt(n) !=-1)
			{
				result = result.substring(0, parseInt(n));
			}			
			
			return result.replace(/,(\s+)?$/, '').trim();
		};
		
		
};
