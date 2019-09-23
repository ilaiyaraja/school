'use strict';

// http://ui-grid.info/docs/#/tutorial/306_expandable_grid
//http://ui-grid.info/docs/#/tutorial/210_selection

//http://angular-ui.github.io/ng-grid/

function APIPortfolioCtrl($scope,$rootScope, $resource, $http, $location, $timeout , apiPortfolioService) 
{
	
	$scope.gridHeaderMessages="API360 Results";
	
	
$scope.apiportfolioShowHideFilter = true;
	
	$scope.apiportfolioShowHide= function()
	{
		if($scope.apiportfolioShowHideFilter)
		{
			$( "#apiPortFoliofilter").fadeOut( "slow");
		}
		else
		{
			$( "#apiPortFoliofilter").fadeIn( "slow");
		}
		
		$timeout(function() {
	    	$( $.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();		        
	    }, 1000);
		
	};
	
	
		
	$rootScope.renderAPIPortfolioGrid = function()
	{
		apiPortfolioService.renderAPIPortfolioGrid($scope,$rootScope);		
		$rootScope.submitDefaultAPIPortfolioSearch();
	};	
	
	
	
	
	
	
	$rootScope.submitDefaultAPIPortfolioSearch = function()
	{
		var url = "/api360-service/api-portfolio/report/returnjson.json?";
		var params=null;
		
		/*
		if($rootScope.urlparams!=undefined)
		{
			params = 'program=' + $rootScope.urlparams.Programs+ 
			 '&client=' + $rootScope.urlparams.Clients+ 
			 '&profile=' + $rootScope.urlparams.Profiles + 
			 '&bundle=' + $rootScope.urlparams.Bundles+
			 '&application=' + $rootScope.urlparams.APIs+ 
			 '&version=0' + 
			 '&env=All'+ 
			 '&backend=' + $rootScope.urlparams.Backends+
			 '&subprocess=' + $rootScope.urlparams.SubProcess + 
			 '&apitoapi=' + $rootScope.urlparams.ApiToApi + 
			 '&federated=' + $rootScope.urlparams.Federated;
		}
		else
		{
			url = "/api360-service/api-portfolio/report/returnjson.json?";
			
			params = 'program=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioGlobalFilterModel("Programs")) +
			 '&client=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioGlobalFilterModel("Clients")) + 
			 '&profile=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioGlobalFilterModel("Profiles")) + 
			 '&bundle=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioGlobalFilterModel("Bundles")) +
			 '&application=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioGlobalFilterModel("APIs")) + 
			 '&version=0' + 
			 '&env=All'+ 
			 '&backend=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioGlobalFilterModel("Backends"))+
			 '&subprocess=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioGlobalFilterModel("SubProcess")) + 
			 '&apitoapi=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioGlobalFilterModel("ApiToApi")) + 
			 '&federated=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioGlobalFilterModel("Federated"));			
		}
		*/
		
		$rootScope.launch('wait');		
		$rootScope.apiportfoliogrid.api().ajax.url(url+params).load($scope.searchGridCallback);
		
	};
	 
	
	$rootScope.submitAPIPortfolioSearch = function()
	{
		var url = '/api360-service/api-portfolio/report.json?';		
		var params=null;
		
		if($rootScope.urlparams!=undefined)
		{
			params = 'program=' + $rootScope.urlparams.Programs+ 
			 '&client=' + $rootScope.urlparams.Clients+ 
			 '&profile=' + $rootScope.urlparams.Profiles + 
			 '&bundle=' + $rootScope.urlparams.Bundles+
			 '&application=' + $rootScope.urlparams.APIs+ 
			 '&version=0' + 
			 '&env=All'+ 
			 '&backend=' + $rootScope.urlparams.Backends+
			 '&subprocess=' + $rootScope.urlparams.SubProcess + 
			 '&apitoapi=' + $rootScope.urlparams.ApiToApi + 
			 '&federated=' + $rootScope.urlparams.Federated+
			 '&jmsprovider=' + $rootScope.urlparams.Jmsproviders;
		}
		else
		{
			params = 'program=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Programs")) +
			 '&client=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Clients")) + 
			 '&profile=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Profiles")) + 
			 '&bundle=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Bundles")) +
			 '&application=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("APIs")) + 
			 '&version=0' + 
			 '&env=All'+ 
			 '&backend=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Backends"))+
			 '&subprocess=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("SubProcess")) + 
			 '&apitoapi=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("ApiToApi")) + 
			 '&federated=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Federated"))+
			 '&jmsprovider=' + $scope.getCommaSeparatedString($rootScope.getAPIPortfolioFilterModel("Jmsproviders"));
		}
				
		$rootScope.launch('wait');		
		$rootScope.apiportfoliogrid.api().ajax.url(url+params).load($scope.searchGridCallback);
	};
	
	
	$scope.searchGridCallback = function ()
	{
		$rootScope.$broadcast('dialogs.wait.complete');
	    
		if($rootScope.urlparams!=undefined)
		{
			
			$rootScope.filterPipeAPIPortfolioGrid("APIs",$rootScope.urlparams.APIs.replace(",","|"));
			$rootScope.filterPipeAPIPortfolioGrid("Clients",$rootScope.urlparams.Clients.replace(",","|"));
			$rootScope.filterPipeAPIPortfolioGrid("Programs",$rootScope.urlparams.Programs.replace(",","|"));
			$rootScope.filterPipeAPIPortfolioGrid("Profiles",$rootScope.urlparams.Profiles.replace(",","|"));
			$rootScope.filterPipeAPIPortfolioGrid("Bundles",$rootScope.urlparams.Bundles.replace(",","|"));
			$rootScope.filterPipeAPIPortfolioGrid("Backends",$rootScope.urlparams.Backends.replace(",","|"));
			$rootScope.filterPipeAPIPortfolioGrid("Federated",$rootScope.urlparams.Federated.replace(",","|"));
			$rootScope.filterPipeAPIPortfolioGrid("ApiToApi",$rootScope.urlparams.ApiToApi.replace(",","|"));
			$rootScope.filterPipeAPIPortfolioGrid("SubProcess",$rootScope.urlparams.SubProcess.replace(",","|") );
			$rootScope.filterPipeAPIPortfolioGrid("Jmsproviders",$rootScope.urlparams.Jmsproviders.replace(",","|") );
		}
		else
		{
			
			
			$rootScope.filterAPIPortfolioGrid("APIs",$rootScope.getAPIPortfolioGlobalFilterModel("APIs"));
			$rootScope.filterAPIPortfolioGrid("Clients",$rootScope.getAPIPortfolioGlobalFilterModel("Clients"));
			$rootScope.filterAPIPortfolioGrid("Programs",$rootScope.getAPIPortfolioGlobalFilterModel("Programs"));
			$rootScope.filterAPIPortfolioGrid("Profiles",$rootScope.getAPIPortfolioGlobalFilterModel("Profiles"));
			$rootScope.filterAPIPortfolioGrid("Bundles",$rootScope.getAPIPortfolioGlobalFilterModel("Bundles"));
			$rootScope.filterAPIPortfolioGrid("Backends",$rootScope.getAPIPortfolioGlobalFilterModel("Backends"));
			$rootScope.filterAPIPortfolioGrid("Federated",$rootScope.getAPIPortfolioGlobalFilterModel("Federated"));
			$rootScope.filterAPIPortfolioGrid("ApiToApi",$rootScope.getAPIPortfolioGlobalFilterModel("ApiToApi"));
			$rootScope.filterAPIPortfolioGrid("SubProcess",$rootScope.getAPIPortfolioGlobalFilterModel("SubProcess"));
			$rootScope.filterAPIPortfolioGrid("Jmsproviders",$rootScope.getAPIPortfolioGlobalFilterModel("Jmsproviders"));
		}
				
		$('#api360Grid tbody tr td').each( function() 
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
	
	
	
	
	$('#apiportfoliogrid tbody').on( 'click', 'tr', function () 
    {
		var position = apiportfoliogrid.fnGetPosition(this); // getting the clicked row position
		var contactId = apiportfoliogrid.fnGetData(position); // getting the value of the first (invisible) column
		//console.log(contactId.account_Type);
		
		if ( $(this).hasClass('selected') ) 
        {
            $(this).removeClass('selected');
        }
        else 
        {
            apiportfoliogrid.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
	

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
	
}