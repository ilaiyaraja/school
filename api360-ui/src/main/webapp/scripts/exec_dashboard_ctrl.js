'use strict';


function ExecDashboardCtrl($scope,$rootScope, $resource, $http, $location,execDashboardService) 
{
	
	$rootScope.environment="PROD";	
	$rootScope.isActiveQC=false;
	$rootScope.isActivePROD=true;
	
	$scope.execDashboardShowHideFilter = true;
	
	$scope.execDashboardShowHide= function()
	{
		if($scope.execDashboardShowHideFilter)
		{
			$( "#execDashboardFilterId" ).fadeOut( "slow");
		}
		else
		{
			$( "#execDashboardFilterId" ).fadeIn( "slow");
		}
		
	};
	
	
	/**
	 * This function gets called when exec dashboard loads first time
	 */
	$scope.renderDashboard = function()
	{
		$rootScope.environment="PROD";
		$rootScope.isActiveQC=false;
		$rootScope.isActivePROD=true;
		
		$rootScope.resetDashboardFilterModels();
		
		 var url = '/api360-service/exec-dashboard/api360/count.json?';
		 var params=null;
		
		if($rootScope.urlparams!=undefined)
		{
			params = 'program=' + $rootScope.urlparams.Programs+ 
			 '&client=' + $rootScope.urlparams.Clients+ 
			 '&profile=' + $rootScope.urlparams.Profiles + 
			 '&bundle=' + $rootScope.urlparams.Bundles+
			 '&application=' + $rootScope.urlparams.APIs+ 
			 '&version=0' + 
			 '&env=' + $rootScope.urlparams.Environments + 
			 '&backend=' + $rootScope.urlparams.Backends;
		}
		else
		{
			 params = 'program=' + $scope.getCommaSeparatedString($rootScope.getExecDashboardGlobalFilterModel("Programs")) + 
			 '&client=' + $scope.getCommaSeparatedString($rootScope.getExecDashboardGlobalFilterModel("Clients")) + 
			 '&profile=' + $scope.getCommaSeparatedString($rootScope.getExecDashboardGlobalFilterModel("Profiles")) + 
			 '&bundle=' + $scope.getCommaSeparatedString($rootScope.getExecDashboardGlobalFilterModel("Bundles")) +
			 '&application=' + $scope.getCommaSeparatedString($rootScope.getExecDashboardGlobalFilterModel("APIs")) + 
			 '&version=0' + 
			 '&env=' + $rootScope.environment+ 
			 '&backend=' + $scope.getCommaSeparatedString($rootScope.getExecDashboardGlobalFilterModel("Backends"));
		}
				
		execDashboardService.renderDashboard($scope,$rootScope,$http,url,params);
	};
	 
	/**
	 * This function gets called when click on search button on filter page.
	 * Calling controller: exec_dashboard_filter_ctrl.js
	 */	
	$rootScope.submitDashboardSearch = function(reset) 
	{
		if(reset!=undefined && reset)
		{
			$rootScope.environment="PROD";
			$rootScope.isActiveQC=false;
			$rootScope.isActivePROD=true;
		}
				
	   var url = '/api360-service/exec-dashboard/api360/count.json?';
		   
	   var params = 'program=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Programs")) + 
				 '&client=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Clients")) + 
				 '&profile=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Profiles")) + 
				 '&bundle=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Bundles")) +
				 '&application=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("APIs")) + 
				 '&version=0' + 
				 '&env=' + $rootScope.environment+ 
				 '&backend=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Backends"));
	   
	  execDashboardService.submitDashboard($scope,$rootScope,$http,url,params); 
	  
	};
	
	
	/**
	 * This function gets called when click on executive dashboard grid views: like clint, program, backend and API.
	 * Calling controller: exec_dashboard_filter_ctrl.js
	 */
	$rootScope.submitDashboardViewSearch = function(name,value) 
	{
		var url = '/api360-service/exec-dashboard/api360/count.json?';
		   
	   var params = 'program=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Programs")) + 
				 '&client=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Clients")) + 
				 '&profile=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Profiles")) + 
				 '&bundle=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Bundles")) +
				 '&application=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("APIs")) + 
				 '&version=0' + 
				 '&env=' + $rootScope.environment+ 
				 '&backend=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Backends"));
	   
	  execDashboardService.submitViewDashboard($scope,$rootScope,$http,url,params,name,value); 
	  
	};
	
	
	$rootScope.reload = function(env) 
	{
		var url = '/api360-service/exec-dashboard/api360/count.json?';
		
		if($rootScope.environment==env)
		{
			return;
		}
		else
		{
			$rootScope.environment = env;
		}
		
		
		if($rootScope.environment=="PROD")
		{
			$rootScope.isActiveQC=false;
			$rootScope.isActivePROD=true;			
		}
		else
		{
			$rootScope.isActiveQC=true;
			$rootScope.isActivePROD=false;
		}
		   
	    var params = 'program=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Programs")) + 
				 '&client=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Clients")) + 
				 '&profile=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Profiles")) + 
				 '&bundle=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Bundles")) +
				 '&application=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("APIs")) + 
				 '&version=0' + 
				 '&env='+ $rootScope.environment +
				 '&backend=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Backends"));
	   
	   execDashboardService.submitDashboard($scope,$rootScope,$http,url,params); 		
	};
	
	
	$scope.onClickCombinedViewIcon = function()
	{	
		if($scope.showCombinedView && ($rootScope.combinedCharttable=="" || $rootScope.combinedCharttable==undefined))
		{
			var params = 'program=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Programs")) + 
			 '&client=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Clients")) + 
			 '&profile=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Profiles")) + 
			 '&bundle=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Bundles")) +
			 '&application=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("APIs")) + 
			 '&version=0' + 
			 '&env='+ $rootScope.environment +
			 '&backend=' + $scope.getCommaSeparatedString($rootScope.getDashboardFilterModel("Backends"));
			
			execDashboardService.onClickCombinedViewIcon($scope,$rootScope,$http,null,params);
		}
	};
	
	
	$scope.combinedViewGridCallback = function ()
	{
		$('#clientViewGridId tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
	};
	
	
	$scope.clientViewGridCallback = function ()
	{
		$('#combinedViewGridId tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
	};
	
	
	$scope.programViewGridCallback = function ()
	{
		$('#programViewGridId tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
	};
	
	
	$scope.apiViewGridCallback = function ()
	{
		$('#apiViewGridId tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
	};
	
	
	$scope.backendViewGridCallback = function ()
	{
		$('#backendViewGridId tbody tr td').each( function() 
	    {
		    this.setAttribute( 'title', $(this).text());
		});
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
	
	$scope.renderDashboard();
}