'use strict';

function GlobalCtrl($scope, $rootScope, $resource, $http, $location, $timeout,
		globalService) 
{
	
	$scope.batchJobDetailUrl = "/admin-service/batchJobs.json";

	$rootScope.batchJobData = [];
	
	$rootScope.reloadBatchJobDetails = function() 
	{	
		$.ajax({
	        url: $scope.batchJobDetailUrl,
	        type: "GET",
	        async: false,
	        success: function(data)
	        {
	        	$rootScope.batchJobData = data.batchJobs;
	        }
	    });
		
	};

	$rootScope.getBatchJobDetail = function(batchJobName,reload) 
	{	
		var returnVal = null;
		
		if(reload==true)
		{
			$rootScope.reloadBatchJobDetails();
		}		
		
		angular.forEach($rootScope.batchJobData, function(value, key) 
		{
			if (value.jobName == batchJobName) 
			{
				returnVal =  value;
			}
		});		
		
		if (returnVal==null){
			return {"lastUpdated":null};
		}

		return returnVal;
	};
	
	
	$rootScope.reloadBatchJobDetails();
};