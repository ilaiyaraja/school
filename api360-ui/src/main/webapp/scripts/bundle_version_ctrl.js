'use strict';


function BundleVersionCtrl($scope,$rootScope, $resource, $http, $location,$timeout,bundleVersionService) 
{
	
	$rootScope.batchJobStatus =   $rootScope.getBatchJobDetail("installedBundleVersionTaskLetJob",true);
	
	$scope.batchJobStatusDetail="Last Synchronized on: "+$rootScope.batchJobStatus.lastUpdated;
	$scope.gridHeaderMessages="Installed Bundle Version Results";	
	
	
	
	 $scope.installedbundleversionShowHideFilter = true;
		
		$scope.installedbundleversionShowHide= function()
		{
			if($scope.installedbundleversionShowHideFilter)
			{
				$( "#installedbundleFilter" ).fadeOut( "slow");
			}
			else
			{
				$( "#installedbundleFilter" ).fadeIn( "slow");
			}
			
			$timeout(function() {
		    	$( $.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();		        
		    }, 1000);
			
		};
	
	
	
	
	
	
	
	
		
	$rootScope.renderGrid = function()
	{
		bundleVersionService.renderBundleVersionGrid($scope,$rootScope);		
		$rootScope.submitInstalledBundleDefaultSearch();
	};	
	
	
	
	$rootScope.submitInstalledBundleDefaultSearch = function()
	{
		var url = '/api360-service/bundle-version/report.json?';
	
		
		var params=null;
		
		if($rootScope.urlparams!=undefined)
		{
			params = 'bundle=' + $rootScope.urlparams.Bundles + '&environment='+$rootScope.urlparams.Environments;
		}
		else
		{
			params = 'bundle=' + $scope.getCommaSeparatedString($rootScope.getInstalledBundleGlobalFilterModel("Bundles")) +'&environment='+$scope.getCommaSeparatedString($rootScope.getInstalledBundleFilterModel("Environments"));
		}
		
		$rootScope.launch('wait');	
	
		$rootScope.bundleVersiontable.api().ajax.url(url+params).load($scope.searchGridCallback);	
	};
	
	
	
	$rootScope.submitInstalledBundleSearch = function()
	{
		var url = '/api360-service/bundle-version/report.json?';
	
		
		var params=null;
		
		if($rootScope.urlparams!=undefined)
		{
			params = 'bundle=' + $rootScope.urlparams.Bundles + '&environment='+$rootScope.urlparams.Environments;
		}
		else
		{
			params = 'bundle=' + $scope.getCommaSeparatedString($rootScope.getInstalledBundleFilterModel("Bundles")) +'&environment='+$scope.getCommaSeparatedString($rootScope.getInstalledBundleFilterModel("Environments"));
		}
		
		$rootScope.launch('wait');	
	
		$rootScope.bundleVersiontable.api().ajax.url(url+params).load($scope.searchGridCallback);	
	};
	
	
	
	$scope.searchGridCallback = function ()
	{
		$rootScope.$broadcast('dialogs.wait.complete');
		
		$('#installedBundleVersionGrid tbody tr td').each( function() 
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
	
	
	
	
	$('#installedBundleVersionGrid tbody').on( 'click', 'tr', function () 
    {
		var position = table.fnGetPosition(this); // getting the clicked row position
		var contactId = table.fnGetData(position); // getting the value of the first (invisible) column
		
		
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
	
	
	
	
};