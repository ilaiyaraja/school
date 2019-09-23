'use strict';


function APIArtifactCtrl($scope,$rootScope, $resource, $http, $location,$timeout,apiartifactService) 
{
	
	
	$scope.gridHeaderMessages="API Artifact Report";
	/*$rootScope.batchJobStatus =   $rootScope.getBatchJobDetail("almqcMigrateTaskLetJob",true);	
	$scope.batchJobStatusDetail=$rootScope.batchJobStatus.lastUpdated;*/
	
	
    $scope.apiartifactShowHideFilter = true;
	
	$scope.apiartifactShowHide= function()
	{
		if($scope.apiartifactShowHideFilter)
		{
			$( "#apiartifactfilterid" ).fadeOut( "slow");
		}
		else
		{
			$( "#apiartifactfilterid" ).fadeIn( "slow");
		}
		
		$timeout(function() {
	    	$( $.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();		        
	    }, 1000);
		
	};
	
	
	$rootScope.renderGrid = function()
	{
		
		apiartifactService.renderAPIArtifactReportGrid($scope,$rootScope,$http,$location);
		$rootScope.submitAPIArtifactReportDefaultSearch();
	};	
	
	
	$rootScope.submitAPIArtifactReportDefaultSearch = function()
	 {
	
	
		var url = '/api360-service/apiartifact/report.json?';
		   
		var params =null;
		
		if($rootScope.urlparams!=undefined)
		{
		
			
			params = 
			 'api=' + $rootScope.urlparams.APIs+ 			 
			 '&bundle=' + $rootScope.urlparams.Bundles+
			 '&version=' + $rootScope.urlparams.Versions;
			 
			
			
			
		}
		else
		{
			
			
			
			
			  params =  
			 'api=' + $scope.getCommaSeparatedString($rootScope.getAPIArtifactFilterGlobalFilterModel("APIs")) + 
			 '&bundle=' + $scope.getCommaSeparatedString($rootScope.getAPIArtifactFilterGlobalFilterModel("Bundles"))+
			 '&version=' + $scope.getCommaSeparatedStringVersion($rootScope.getAPIArtifactFilterGlobalFilterModel("Versions"));
			
		}	
		
	
		$rootScope.launch('wait');	
		
		
		
	
		
		$rootScope.apiartifactreporttable.ajax.url(url+params).load($scope.searchGridCallback);	
	};
	 
	
	$rootScope.submitAPIArtifactSearch = function()
	{
		var url = '/api360-service/apiartifact/report.json?';
		   
		var params =null;
		
		if($rootScope.urlparams!=undefined)
		{
			params = 'api=' + $rootScope.urlparams.APIs+ 			 
				 '&bundle=' + $rootScope.urlparams.Bundles+
				 '&version=' + $rootScope.urlparams.Versions ;
			
			
		}
		else
		{
			  params = 'api=' + $scope.getCommaSeparatedString($rootScope.getAPIArtifactFilterModel("APIs")) + 
			 '&bundle=' + $scope.getCommaSeparatedString($rootScope.getAPIArtifactFilterModel("Bundles"))+
			 '&version=' + $scope.getCommaSeparatedString($rootScope.getAPIArtifactFilterModel("Versions"));
			  
			  
			 
		}	
		
		
		
		$rootScope.launch('wait');	
		
		$rootScope.apiartifactreporttable.ajax.url(url+params).load($scope.searchGridCallback);	
	};
	
	
	$scope.searchGridCallback = function ()
	{
		$rootScope.$broadcast('dialogs.wait.complete');
		
		$('#apiartifactGridID tbody tr td').each( function() 
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$('#apiartifactGridID tbody').on( 'click', 'tr', function () 
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
	
	
	
	
	
	
	
	$scope.getCommaSeparatedStringVersion = function(json) 
	{ 
		if(json==undefined || json==null)
		{
			return "97.0";
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