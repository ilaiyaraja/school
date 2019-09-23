
'use strict';


function QueryParamsHandlerCtrl($scope,$rootScope, $resource, $http, $location) 
{
	
	if(!jQuery.isEmptyObject($location.search()))
	{
		$rootScope.urlapp = $location.search().app;		
		$rootScope.urlparams = $location.search();		
		$location.path('/'+$rootScope.urlapp);		
	}	
	else if($rootScope.urlapp!=undefined && $rootScope.urlapp!="")
	{
		$location.path('/'+$rootScope.urlapp);
	}	
	else
	{
		$location.path('/dashboard');
	}
		
}