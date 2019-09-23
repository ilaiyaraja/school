'use strict';



function AdapterInventoryCtrl($scope,$rootScope, $resource, $http,$location, $timeout , adapterInventoryService) 
{
	$scope.gridHeaderMessages="Adapter Inventory  Results";
	
	$scope.adapterinventroyShowHideFilter = true;
	 
	 
	 $scope.adapterinventroyShowHide = function()
		{
	         	
			if($scope.adapterinventroyShowHideFilter)
			{
				$( "#adapterfilterid").fadeOut( "slow");
			}
			else
			{
				$( "#adapterfilterid").fadeIn( "slow");
			}
			
			$timeout(function() {
		    	$( $.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();		        
		    }, 1000);
			
		};

		$rootScope.renderGrid = function()
		{
			adapterInventoryService.renderAdapterInventoryGrid($scope,$rootScope);
			$rootScope.submitAdapterInventroyDefaultSearch();
		};	
		
		
		$rootScope.submitAdapterInventroyDefaultSearch = function()
		{
			var url = '/api360-service/adapter_inventory/report.json?';
			   
			var params =null;
			
			if($rootScope.urlparams!=undefined)
			{
				params = 
				  'bundle=' + $rootScope.urlparams.Bundles+
				 '&application=' + $rootScope.urlparams.APIs+ 			 
				 '&adapter=' + $rootScope.urlparams.Backends;
				 
			}
			else
			{
				  params = 'bundle=' + $scope.getCommaSeparatedString($rootScope.getAdapterInventoryGlobalFilterModel("Bundles")) + 
				 '&application=' + $scope.getCommaSeparatedString($rootScope.getAdapterInventoryGlobalFilterModel("APIs")) + 
				 '&adapter='+$scope.getCommaSeparatedString($rootScope.getAdapterInventoryGlobalFilterModel("Backends"));
				
			}	
			
		
			
			$rootScope.launch('wait');		
			$rootScope.adapterInventorytable.api().ajax.url(url+params).load($scope.searchGridCallback);	
		};
		 
		
		$rootScope.submitAdapterInventorySearch = function()
		{
			var url = '/api360-service/adapter_inventory/report.json?';
			   
			var params =null;
			  
			if($rootScope.urlparams!=undefined)
			{
				params = 
				 'bundle=' + $rootScope.urlparams.Bundles+
				 '&application=' + $rootScope.urlparams.APIs+ 			 
				 '&adapter=' +$rootScope.urlparams.Backends;
				
			}
			else
			{
				  params = 'bundle=' + $scope.getCommaSeparatedString($rootScope.getAdapterInventoryFilterModel("Bundles")) + 
				           '&application=' + $scope.getCommaSeparatedString($rootScope.getAdapterInventoryFilterModel("APIs")) + 
				           '&adapter=' + $scope.getCommaSeparatedString($rootScope.getAdapterInventoryFilterModel("Backends"));
				
			}	
			
			
			
		
			
			$rootScope.launch('wait');		
			$rootScope.adapterInventorytable.api().ajax.url(url+params).load($scope.searchGridCallback);	
		};
		
		
		$scope.searchGridCallback = function ()
		{
			$rootScope.$broadcast('dialogs.wait.complete');
			
			$('#adapterInventoryGridID tbody tr td').each( function() 
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
		
		
		
		
		$('#adapterInventoryGridID tbody').on( 'click', 'tr', function () 
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