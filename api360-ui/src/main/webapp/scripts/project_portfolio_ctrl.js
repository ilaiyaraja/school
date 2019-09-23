'use strict';

// http://ui-grid.info/docs/#/tutorial/306_expandable_grid
//http://ui-grid.info/docs/#/tutorial/210_selection

//http://angular-ui.github.io/ng-grid/

function ProjectPortfolioCtrl($scope,$rootScope, $resource, $http, $location,$timeout,projectPortfolioService) 
{
	$scope.gridHeaderMessages="Project Portfolio Results";
	
	
	
	
	 $scope.projectPortfolioShowHideFilter = true;
		
		$scope.projectPortfolioShowHide= function()
		{
			if($scope.projectPortfolioShowHideFilter)
			{
				$( "#projectPortfolioFilterId" ).fadeOut( "slow");
			}
			else
			{
				$( "#projectPortfolioFilterId" ).fadeIn( "slow");
			}
			
			$timeout(function() {
		    	$( $.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();		        
		    }, 1000);
			
		};
		
	$rootScope.renderGrid = function()
	{
		projectPortfolioService.renderProjectPortfolioGrid($scope,$rootScope);
		
		$rootScope.submitProjectPortfolioDefaultSearch();
	};	
	
	
	$rootScope.submitProjectPortfolioDefaultSearch = function()
	{
		var url = '/api360-service/project-portfolio/report.json?';
		   
		var params =null;
		
		if($rootScope.urlparams!=undefined)
		{
			params = 
			 'bundle=' + $rootScope.urlparams.Bundles+
			 '&application=' + $rootScope.urlparams.APIs+ 			 
			 '&backend=' + $rootScope.urlparams.Backends+
			 '&release=' + $rootScope.urlparams.Release+
			 '&pid=' + $rootScope.urlparams.PID+
			 '&program=' + $rootScope.urlparams.Programs;
		}
		else
		{
			  params = 'bundle=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioGlobalFilterModel("Bundles")) + 
			 '&application=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioGlobalFilterModel("APIs")) + 
			 '&backend=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioGlobalFilterModel("Backends"))+
			 '&release=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioGlobalFilterModel("Release"))+
			 '&pid=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioGlobalFilterModel("PID"))+
			 '&program=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioGlobalFilterModel("Programs"));
		}	
		
		$rootScope.launch('wait');		
		$rootScope.projectPortfoliotable.api().ajax.url(url+params).load($scope.searchGridCallback);	
	};
	 
	
	$rootScope.submitProjectPortfolioSearch = function()
	{
		var url = '/api360-service/project-portfolio/report.json?';
		   
		var params =null;
		
		if($rootScope.urlparams!=undefined)
		{
			params = 
			 'bundle=' + $rootScope.urlparams.Bundles+
			 '&application=' + $rootScope.urlparams.APIs+ 			 
			 '&backend=' + $rootScope.urlparams.Backends+
			 '&release=' + $rootScope.urlparams.Release+
			 '&pid=' + $rootScope.urlparams.PID+
			 '&program=' + $rootScope.urlparams.Programs;
		}
		else
		{
			  params = 'bundle=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioFilterModel("Bundles")) + 
			 '&application=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioFilterModel("APIs")) + 
			 '&backend=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioFilterModel("Backends"))+
			 '&release=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioFilterModel("Release"))+
			 '&pid=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioFilterModel("PID"))+
			 '&program=' + $scope.getCommaSeparatedString($rootScope.getProjectPortfolioFilterModel("Programs"));
		}	
		
		$rootScope.launch('wait');		
		$rootScope.projectPortfoliotable.api().ajax.url(url+params).load($scope.searchGridCallback);	
	};
	
	
	$scope.searchGridCallback = function ()
	{
		$rootScope.$broadcast('dialogs.wait.complete');
		
		$('#projectportfolioGridID tbody tr td').each( function() 
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
	
	
	
	
	$('#projectportfolioGridID tbody').on( 'click', 'tr', function () 
    {
		var position = table.fnGetPosition(this); // getting the clicked row position
		var contactId = table.fnGetData(position); // getting the value of the first (invisible) column
		//console.log(contactId.account_Type);
		
		if ( $(this).hasClass('selected') ) 
        {
            $(this).removeClass('selected');
        }
        else 
        {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
	
	
}