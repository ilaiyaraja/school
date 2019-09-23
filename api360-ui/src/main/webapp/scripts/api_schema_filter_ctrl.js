'use strict';

function APISchemaSearchFilterCtrl($scope, $rootScope, $resource, $http, $location, $timeout, apiSchemaSearchFilterService) {

	
	if (!jQuery.isEmptyObject($location.search())) {
		$rootScope.urlapp = $location.search().app;
		$rootScope.urlparams = $location.search();
	}

	$rootScope.pageLoaction = "";

	$rootScope.APISchemaSearchloadComboBox = function() {
		apiSchemaSearchFilterService.updateScopeFiltersWithDefaultValues($scope, $rootScope);
		apiSchemaSearchFilterService.resetRadioType($scope, $rootScope);
		apiSchemaSearchFilterService.loadComboBox($scope, $rootScope, $http, $location.path());
		
		
	};

	$scope.resetAPISchemaSearchSearchFilters = function() {
		apiSchemaSearchFilterService.updateScopeFiltersWithDefaultValues($scope, $rootScope);
		apiSchemaSearchFilterService.reloadComboBoxApiSearchSchema($scope,$rootScope);
		apiSchemaSearchFilterService.loadComboBox($scope, $rootScope, $http, $location.path());
		// apiSchemaSearchFilterService.hideResponseFilter($scope, $rootScope);
		apiSchemaSearchFilterService.resetRadioType($scope, $rootScope);

	};
	

	
	$scope.onTypeRadioButtonClick = function() 
	{
		if ($scope.type2 == "true") {
			$scope.type2 = "true";
		} else {
			$scope.type2 = "false";
		}
	};
	
	 $rootScope.getApiSchemaSearchFilterModel = function(model)
	 {
		/* if ($scope.keyword1 == '')
		 {
			 alert("Insufficient Data! Please select a Keyword1 for search .");
		 }
		 else if (keyword01 == '')
		 {
			 alert("Insufficient Data! Please select a Keyword01 for search .");
		 }*/
		 
		 
		 if ("Service" == model)
		 {
			return $scope.apiSchemaServiceNameModel;
		 } 		  
		 else if ("keyword1" == model)
		 {
			return $scope.keyword1;
		 } 
		 else if ("keyword01" == model)
		 {
				return $scope.keyword01;
		 } 
		 else if ("searchSchema" == model) 
		 {
			return $scope.apiSearchSchemaScopeModel;
		 } 
		 else if ("apiVersion" == model)
		 {
			return $scope.apiSchemaVersionModel;
		 }
		 else if ("type2" == model)
		 {
			return $scope.type2;
		 } 
		 
	 };
	

	$scope.resetComboBox = function() 
	{
		$rootScope.APISchemaSearchloadComboBox($scope, $rootScope,$location.path());
	};
	
	$rootScope.reloadApiSchemaPage= function(name, value) 
	 {
		apiSchemaSearchFilterService.dashboardFilterReload($scope,$rootScope,name, value); 
		
			
	 };

}