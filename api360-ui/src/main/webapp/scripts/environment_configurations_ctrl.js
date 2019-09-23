'use strict';



function EnvironmentConfigurationsCtrl($scope,$rootScope, $resource, $http,$location,$modal,$timeout,environmentConfigurationService) 
{
	$rootScope.batchJobStatus =   $rootScope.getBatchJobDetail("environmentConfigurationTaskletJob",true);	
	$scope.gridHeaderMessages="Environment Configurations Results";
	$scope.batchJobStatusDetail=$rootScope.batchJobStatus.lastUpdated;
	
	
	 $scope.environmentConfigShowHideFilter = true;
		
		$scope.environmentConfigShowHide= function()
		{
			if($scope.environmentConfigShowHideFilter)
			{
				$( "#envConfigFilterId" ).fadeOut( "slow");
			}
			else
			{
				$( "#envConfigFilterId" ).fadeIn( "slow");
			}
			
			$timeout(function() {
		    	$( $.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();		        
		    }, 1000);
			
		};
	
	
	
	
	$rootScope.renderGrid = function()
	{
		environmentConfigurationService.renderEnvironmentConfigurationGrid($scope,$rootScope,$http);
		$rootScope.submitEnvironmentConfigurationDefaultSearch();
	};	
		
	$rootScope.submitEnvironmentConfigurationDefaultSearch = function()
	{
		var url = '/api360-service/environment_configuration/adapters.json?';
		   
		var params =null;
		params="";
		if($rootScope.urlparams!=undefined)
		{
			params = 
			  'adapters=' + $rootScope.urlparams.adapters+
			 '&adapterBundles=' + $rootScope.urlparams.adapterBundles+ 			 
			 '&serviceBundles=' + $rootScope.urlparams.serviceBundles+			 
			 '&releases=' + $rootScope.urlparams.releases+
			 '&versions=' + $rootScope.urlparams.versions+
			 '&environments=' + $rootScope.urlparams.environments+
			 '&vtierhostnames=' + $rootScope.urlparams.vtierhostnames;
		}
		else
		{
			  params = 'adapters=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Adapters")) + 
			 '&adapterBundles=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("AdapterBundles")) + 
			 '&serviceBundles='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("ServiceBundles")) +			
			 '&releases='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Releases")) +
			 '&versions='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Versions")) +
			 '&environments='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Environments")) +
			 '&vtierhostnames='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Vtierhostnames"));
		}	

		$rootScope.launch('wait');
		$rootScope.environmentConfigurationTable.ajax.url(url+params).load($scope.searchGridCallback);	
	};
	 
	
	$rootScope.submitEnvConfigSearch = function()
	{
		var url = '/api360-service/environment_configuration/adapters.json?';
		   
		var params =null;
		
		if($rootScope.urlparams!=undefined)
		{
			params = 
				  'adapters=' + $rootScope.urlparams.adapters+
				 '&adapterBundles=' + $rootScope.urlparams.adapterBundles+ 			 
				 '&serviceBundles=' + $rootScope.urlparams.serviceBundles+			 
				 '&releases=' + $rootScope.urlparams.releases+
				 '&versions=' + $rootScope.urlparams.versions+
				 '&environments=' + $rootScope.urlparams.environments+
				 '&vtierhostnames=' + $rootScope.urlparams.vtierhostnames;		
		}
		else
		{
			params = 'adapters=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Adapters")) + 
			 '&adapterBundles=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("AdapterBundles")) + 
			 '&serviceBundles='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("ServiceBundles")) +			
			 '&releases='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Releases")) +
			 '&versions='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Versions")) +
			 '&environments='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Environments")) +
			 '&vtierhostnames='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Vtierhostnames"));
		}	
		
		$rootScope.launch('wait');		
		$rootScope.environmentConfigurationTable.ajax.url(url+params).load($scope.searchGridCallback);	
	};
	
	
	$scope.searchGridCallback = function ()
	{
		$rootScope.$broadcast('dialogs.wait.complete');
		
		$('#environmentConfigurationGridID tbody tr td').each( function() 
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
	
	
	
	
	$('#environmentConfigurationGridID tbody').on( 'click', 'tr', function () 
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
	
	$scope.open = function() {
		
		var modalInstance = $modal
				.open({
					templateUrl : 'partials/environmentconfig_dailog.html',
					controller : 'ModalEnvironmentConfigInstanceCtrl',
					dialogClass: 'modal myWindow',
				    resolve: {
				        release: function(){
				            return $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Releases")) ;
				        },
				        enviro: function(){
				        	
				        	if($scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Environments")) =='All'){
				        		
				        		 var optionData= $rootScope.getEnvConfigFilterData("Environments") ;
				        		 var result = "";
				        		 var found =false;
				        		
				        		 for (var dString in optionData) 
				     			{ 
				     				result += optionData[dString].id + ",";
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
				     			console.log(result);
				     			return result.replace(/,(\s+)?$/, ''); 
				        		
				        	}else{
				        	    return $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Environments")) ; 
				        		
				        	}
				        	
				        	
				           
				        },
				        adapters: function(){
				            return $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Adapters")) ;
				        },
				        adapterBundles: function(){
				            return $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("AdapterBundles")) ;
				        },
				        serviceBundles: function(){
				            return $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("ServiceBundles")) ;
				        },
				        versions: function(){
				            return $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Versions")) ;
				        },
				        environments: function(){
				            return $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Environments")) ;
				        },
				        vtierhostnames: function(){
				            return $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Vtierhostnames")) ;
				        }
				        
				        
				        
				      
				    
					}
				}); // optional param;
	};
	
	$rootScope.extractConfig = function()
	{
		
               
                if ($scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Releases")) == 'All' 
        			|| $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Releases")).indexOf(",")>-1){
        			//alert("Please select one release at a time");
        			 $rootScope.launch('custom8');
        			return false;
        		}
                
                
                $scope.open();
        
		
		/*var url = '/api360-service/environment_configuration/extract-configs?';
		   
		var params = 'adapters=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Adapters")) + 
			 '&adapterBundles=' + $scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("AdapterBundles")) + 
			 '&serviceBundles='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("ServiceBundles")) +			
			 '&release='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Releases")) +
			 '&versions='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Versions")) +
			 '&environments='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Environments")) +
			 '&vtierhostnames='+$scope.getCommaSeparatedString($rootScope.getEnvConfigFilterModel("Vtierhostnames"));
		
		var loadFilters = $http.get(url+params);
		$http.dataType="json";
		loadFilters.then(function(payload) {
			//alert(payload.data.files + " - " + payload.data.time_taken);
		});	*/
	};
	



}