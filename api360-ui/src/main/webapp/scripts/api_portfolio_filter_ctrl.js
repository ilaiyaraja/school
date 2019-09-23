'use strict';


function APIPortfolioFiltersCtrl($scope,$rootScope, $resource, $http, $location,apiPortfolioFilterService) 
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
		params = params + '&Programs=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Programs"));
		params = params +  '&Clients=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Clients"));
		params = params +  '&Profiles=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Profiles"));
		params = params +  '&Bundles=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Bundles"));
		params = params +  '&APIs=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("APIs"));
		params = params +  '&Environments=' + $rootScope.environment;
		params = params +  '&Backends=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Backends"));
		params = params +  '&Federated=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Federated"));
		params = params +  '&ApiToApi=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("ApiToApi"));
		params = params +  '&SubProcess=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("SubProcess"));
		params = params +  '&Jmsprovider=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Jmsproviders"));
		
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
	
	
     $rootScope.APIPortfolioloadComboBox= function() 
	 {
    	apiPortfolioFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
    	apiPortfolioFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);
    	
    	//var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/"+$scope.federated+"/"+$scope.apitoapi+"/"+$scope.subprocess+"/allfilters.json";
    	
    	//if($scope.api=="All" && $scope.version=="0" && $scope.profile=="All" && $scope.client=="All" && $scope.program=="All" && $scope.bundle=="All" && $scope.backend=="All" && $scope.environment=="All" && $scope.federated=="All" && $scope.subprocess=="All")
    	//{
    		var url = "/api360-service/filter/lookup/returnjson/api_portfolio_filters.json";
    	//}
    	
		apiPortfolioFilterService.loadComboBox($scope,$rootScope,$http,url,$location.path());    	 
	 };
	 
	 
	 
	 $rootScope.getAPIPortfolioGlobalFilterModel = function(model)
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
			return $scope.environmentAPIPortfolioModel;
		 }else if("Federated"==model)
		  {
				return $scope.federatedAPIPortfolioModel;
		  }else if("ApiToApi"==model)
		  {
				return $scope.apitoapiAPIPortfolioModel;
		  }else if("SubProcess"==model)
		  {
				return $scope.subprocessAPIPortfolioModel;
		  }else if("Jmsproviders"==model)
		  {
				return $scope.jmsproviderAPIPortfolioModel;
		  }
		 
		 
	 };
	 
	 
	
	 $rootScope.getAPIPortfolioFilterModel = function(model)
	 {
		 
		 if("Clients"==model)
		 {
			 return $scope.clientAPIPortfolioModel;	
		 }
		 else if("Programs"==model)
		 {
			return $scope.programAPIPortfolioModel;
		 }
		 else if("Profiles"==model)
		 {
			 return $scope.profileAPIPortfolioModel;
		 }	
		 else if("Bundles"==model)
		 {
			 return $scope.bundleAPIPortfolioModel;
		 }	
		 else if("APIs"==model)
		 {
			 return $scope.apiAPIPortfolioModel;			 
		 }
		 else if("Backends"==model)
		 {
			return $scope.backendAPIPortfolioModel;
		 }	
		 else if("Environments"==model)
		 {
			return $scope.environmentAPIPortfolioModel;
		 }else if("Federated"==model)
		  {
				return $scope.federatedAPIPortfolioModel;
		  }else if("ApiToApi"==model)
		  {
				return $scope.apitoapiAPIPortfolioModel;
		  }else if("SubProcess"==model)
		  {
				return $scope.subprocessAPIPortfolioModel;
		  }else if("Jmsproviders"==model)
		  {
				return $scope.jmsproviderAPIPortfolioModel;
		  }
	 };
	 
	 	 
	 $rootScope.resetAPIPortfolioFilters = function()
	 {
		 $rootScope.urlparams=null;		 
		 apiPortfolioFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);	
		 $rootScope.resetGlobalFilterValues();			 
		 $scope.resetComboBox();
		 $('#apiportfoliogrid').DataTable().search('').columns().search('').draw();
		 //$rootScope.apiportfoliogrid.fnFilter(value, null, true, false, true, true);
		 //$rootScope.submitDefaultAPIPortfolioSearch();
	 };
	 
	 $scope.resetComboBox= function() 
	 {
		 var url = "/api360-service/filter/lookup/returnjson/api_portfolio_filters.json?";		 
         //var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/"+$scope.federated+"/"+$scope.apitoapi+"/"+$scope.subprocess+"/allfilters.json";
         $rootScope.APIPortfolioloadComboBox($scope,$rootScope,$http,url,$location.path());         
	 };
	 
	 $rootScope.ReLoadAPIPortfolioComboBox= function(name, value) 
	 {
		 apiPortfolioFilterService.dashboardFilterReload($scope,$rootScope,name, value);
		 var url = "/api360-service/filter/lookup/"+$scope.api+"/"+$scope.version+"/"+$scope.profile+"/"+$scope.client+"/"+$scope.program+"/"+$scope.bundle+"/"+$scope.backend+"/"+$scope.environment+"/"+$scope.federated+"/"+$scope.apitoapi+"/"+$scope.subprocess+"/"+$scope.jmsprovider+"/allfilters.json";
		 apiPortfolioFilterService.reloadComboBox($scope,$rootScope,$http,url,name);	
		 $scope.filterGrid(name,value);
	 };
	 
	 $rootScope.filterAPIPortfolioGrid  = function(name,value)
	 {
		 $scope.filterGrid(name,value);
	 };
	 
	 $rootScope.filterPipeAPIPortfolioGrid  = function(name,value)
	 {
		 $scope.filterPipeGrid(name,value);
	 };
	 
	 $scope.filterPipeGrid = function(name,val)
	 {
		 	//http://www.datatables.net/release-datatables/examples/api/regex.html
		 	//https://jquery-datatables-column-filter.googlecode.com/svn/trunk/regex.html
			 
			 if("Clients"==name)
			 {
				$scope.filterSearch(8,val);
			 }
			 else if("Programs"==name)
			 {
				 $scope.filterSearch(7,val);
			 }
			 else if("Profiles"==name)
			 { 
				 	$scope.filterSearch(9,val);
				 
			 }	
			 else if("Bundles"==name)
			 {
				    $scope.filterSearch(3,val);
			 }	
			 else if("APIs"==name)
			 {
				 	$scope.filterSearch(0,val);	 
			 }
			 else if("Backends"==name)
			 {
				 	$scope.filterSearch(5,val);
			 }
			 else if("Federated"==name)
			  {
				   
				   if(val=="FEDERATED")
					{
						val = "^"+val; 
					}
				   
				   
				    $scope.filterSearch(6,val);
			  }else if("ApiToApi"==name)
			  {
				    $scope.filterSearch(1,val);
			  }else if("SubProcess"==name)
			  {
				    $scope.filterSearch(2,val);
			  }else if("Jmsproviders"==name)
			  {
				    $scope.filterSearch(10,val);
			  }
			 
	 };
	 
	 
	 
	 
	 
	 $scope.filterGrid = function(name,value)
	 {
		 	//http://www.datatables.net/release-datatables/examples/api/regex.html
		 	//https://jquery-datatables-column-filter.googlecode.com/svn/trunk/regex.html
			 
			 if("Clients"==name)
			 {
				var val =  $scope.getPipeSeparatedString($scope.clientAPIPortfolioModel);
				$scope.filterSearch(8,val);
			 }
			 else if("Programs"==name)
			 {
				 var val =  $scope.getPipeSeparatedString($scope.programAPIPortfolioModel);
				 $scope.filterSearch(7,val);
			 }
			 else if("Profiles"==name)
			 { 
				 	var val =  $scope.getPipeSeparatedString($scope.profileAPIPortfolioModel);
				 	$scope.filterSearch(9,val);
				 
			 }	
			 else if("Bundles"==name)
			 {
				    var val =  $scope.getPipeSeparatedString($scope.bundleAPIPortfolioModel);
				    $scope.filterSearch(3,val);
			 }	
			 else if("APIs"==name)
			 {
				 	var val =  $scope.getPipeSeparatedString($scope.apiAPIPortfolioModel);
				    $scope.filterSearch(0,val);	 
			 }
			 else if("Backends"==name)
			 {
				 	var val =  $scope.getPipeSeparatedString($scope.backendAPIPortfolioModel);
				    $scope.filterSearch(5,val);
			 }
			 else if("Federated"==name)
			  {
				  var val =  $scope.getPipeSeparatedString($scope.federatedAPIPortfolioModel);	
				  
					if(val=="FEDERATED")
					{
						val = "^"+val; 
					}
					 
					  	
				  $scope.filterSearch(6,val);
				  
				  
			  }else if("ApiToApi"==name)
			  {
				  var val =  $scope.getPipeSeparatedString($scope.apitoapiAPIPortfolioModel);
				    $scope.filterSearch(1,val);
			  }else if("SubProcess"==name)
			  {
				  var val =  $scope.getPipeSeparatedString($scope.subprocessAPIPortfolioModel);
				    $scope.filterSearch(2,val);
			  }else if("Jmsproviders"==name)
			  {
				    var val =  $scope.getPipeSeparatedString($scope.jmsproviderAPIPortfolioModel);
				    $scope.filterSearch(10,val);
			  }
	 };
	 	 
	 
	 $scope.apigridsearchvalue="";
	 
	 $scope.filterSearch = function(colid,value)
	 {
		   console.log(value+"==="+colid); 
		 
		    if(value=="All")
			{
				$('#apiportfoliogrid').DataTable().column(colid).search("").draw();
		    	//$rootScope.apiportfoliogrid.fnFilter("", null, true, true, true, true);
			}
			else
			{
				
				/*
				if($scope.apigridsearchvalue!="")
				{
					$scope.apigridsearchvalue = $scope.apigridsearchvalue + "|"+value;
				}					
				else
				{
					$scope.apigridsearchvalue = value;
				}
				*/
				
				//$rootScope.apiportfoliogrid.fnFilterClear();				
				//(?=.*foo)(?=.*baz)
				
				//console.log(value);
				
				$('#apiportfoliogrid').DataTable().column(colid).search(value,true,false,true).draw();
				//$rootScope.apiportfoliogrid.fnFilter($scope.apigridsearchvalue, null, true, true, true, true);
				
				//$('#apiportfoliogrid').DataTable().search($scope.apigridsearchvalue,true,true,true).draw();
			}
		    
		 //$('#apiportfoliogrid').DataTable().search(value,true,true).draw();
		 
	 };
	 
	 
	 $rootScope.getAPIPortfolioURLFilter = function(model)
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
		 else if("Jmsproviders"==model)
		 {
			return $scope.jmsprovider;
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
