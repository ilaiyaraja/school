'use strict';


function RouteCtrl($scope,$rootScope, $resource, $http, $location) 
{
	
	$scope.getInclude = function() 
	{
		var defaultPath = "partials/default-include.html";
		
		var urlPath = $location.path();
		
		if(urlPath=="/dashboard")
		{
			return defaultPath;
		}
		else
		{
			return defaultPath;
		}
	};
	
};