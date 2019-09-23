'use strict';


function FederatedQcCoverageFilterCtrl($scope,$rootScope, $resource, $http, $location,federatedQcCoverageFilterService)  {
	
	if(!jQuery.isEmptyObject($location.search()))
	{
		$rootScope.urlapp = $location.search().app;		
		$rootScope.urlparams = $location.search();
	}	
	
	$rootScope.pageLoaction="";	
	//federatedQcCoverageFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
     
	 
	
	  $scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
	  };
	  $scope.toggleMin();

	  $scope.openQcStartDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.qcStartDateOpened = true;
	  };
	  
	  $scope.openQcEndDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.qcEndDateOpened = true;
	  };
	  
	  $scope.openStartDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.startDateOpened = true;
	  };
   
	  $scope.openEndDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.endDateOpened = true;
	  };
		
	  $scope.monthArray = [];
	  $scope.monthArray[0]="JAN";
	  $scope.monthArray[1]="FEB";
	  $scope.monthArray[2]="MAR";
	  $scope.monthArray[3]="APR";
	  $scope.monthArray[4]="MAY";
	  $scope.monthArray[5]="JUN";
	  $scope.monthArray[6]="JUL";
	  $scope.monthArray[7]="AUG";
	  $scope.monthArray[8]="SEP";
	  $scope.monthArray[9]="OCT";
	  $scope.monthArray[10]="NOV";
	  $scope.monthArray[11]="DEC";
	  
	   
	  $scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
	  };

	  $scope.formats = ['dd-MMMM-yyyy','MM/dd/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format = $scope.formats[1];
	  
		$scope.today = function() {
				$scope.qcStartDate = new Date();
				$scope.qcEndDate = new Date();
				$scope.StartDate = new Date();
				$scope.EndDate = new Date();
	 			
		};
		$scope.today();
		//$scope.userCode =  $rootScope.loginuser;
		$scope.userCode =  $rootScope.attuid.split(",")[0];
		$scope.userEmail = $rootScope.loginemailid;
		
		
		$scope.weekFrequency = false;
		$scope.monthFrequency = false;
		$scope.frequency = "Daily";
		$scope.week ="SUN";
		 
		
		$scope.change = function() {};
	  
	 $scope.mytime = "12:00 AM";
	 $scope.reportFormat="PDF";
	 
	  $scope.hstep = 1;
	  $scope.mstep = 1;
	  
	 

	  $scope.options = {
			hstep: [1, 2, 3],
			mstep: [1, 5, 10, 15, 25, 30]
	  };
	  
	  $scope.ismeridian = true;
	  $scope.update = function() {
			var d = new Date();
			d.setHours( 14 );
			d.setMinutes( 0 );
			$scope.mytime = d;
	  };
	  
	  $scope.frequencyChangeFn=function(item){
		     var currentDate = new Date();
		     
		     if(item  == "Weekly"){
		    	 $scope.weekFrequency = true;
		    	 $scope.monthFrequency = false;
		     }else if(item == "Monthly"){
		    	 $scope.monthFrequency = true;
		    	 $scope.weekFrequency = false;
		    	 $scope.month =   $scope.monthArray[currentDate.getMonth()];
		   
		     }else{
		    	 $scope.weekFrequency = false;
		 		$scope.monthFrequency = false;
		     }
	    }  
	  
	  
	  $rootScope.QCCoverageloadComboBox= function() 
	  {
		 
	  };

	  $rootScope.getProjectPortfolioGlobalFilterModel = function(model)
		 {
			 
			 if("APIs"==model)
			 {
				 return $rootScope.getModelObject($rootScope.getGlobalURLFilter("APIs"));			 
			 }
						 
		 };
	  
		 $rootScope.getProjectPortfolioFilterModel = function(model)
		 {
			  if("APIs"==model)
			 {
				 return $scope.apiProjectPortfolioModel;			 
			 }
		
	 }
		 $rootScope.getProjectPortfolioURLFilter= function(model)
		 {
			  if("APIs"==model)
			 {
				 return $scope.api;			 
			 }
			 
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
		
		
		 $rootScope.ReLoadQcCodeCoverageComboBox= function(name, value) 
		 {
			 federatedQcCoverageFilterService.dashboardFilterReload($scope,$rootScope,name, value); 
				
		 };	

	     $rootScope.loadQcCodeCoverageComboBox= function() 
		 {
	    	 
	    	 
	    	 federatedQcCoverageFilterService.loadComboBox($scope,$rootScope,$http,$location.path());
	     
	    	  
		 };
		 
		 
		
		$rootScope.resetQcCodeCoverageFilters = function()
		  {
		    
			//federatedQcCoverageFilterService.emptyFilterModels();
			$scope.loadQcCodeCoverageComboBox();
		   
		  };
		  
		
		 
				   
	   $rootScope.getQcCodeCoverageFilterModel = function(model)
		 {
			
		   if("sheduleRepotStartDate"==model)
			 {
				 var monthValue = $scope.StartDate.getMonth()+1;
				 if(monthValue <=9){
					 monthValue = '0'+monthValue;
				 }
				 var dateValue = $scope.StartDate.getDate();
				 if(dateValue <=9){
					 dateValue = '0'+dateValue;
				 }
				 var formattedDate = monthValue+'/'+dateValue+'/'+$scope.StartDate.getFullYear()
				 return formattedDate;
			 }	else if("sheduleRepotEndDate"==model)
			 {
				 var monthValue = $scope.EndDate.getMonth()+1;
				 if(monthValue <=9){
					 monthValue = '0'+monthValue;
				 }
				 var dateValue = $scope.EndDate.getDate();
				 if(dateValue <=9){
					 dateValue = '0'+dateValue;
				 }
				 var formattedDate = monthValue+'/'+dateValue+'/'+$scope.EndDate.getFullYear()
				 return formattedDate;
			 }else if("frequency"==model ){
				 
				 return $scope.frequency;
				 
			 }else if("pdf"==model ){
				 
				 return $scope.reportFormat;
				 
			 }else if("month"==model ){
				 
				 return $scope.month.trim();
				 
		 	 } else if("week"==model ){
					 
					 return $scope.week;
					 
		 	 }  else if("startDate"==model){
				 var monthValue = $scope.qcStartDate.getMonth()+1;
				 if(monthValue <=9){
					 monthValue = '0'+monthValue;
				 }
				 var dateValue = $scope.qcStartDate.getDate();
				 if(dateValue <=9){
					 dateValue = '0'+dateValue;
				 }
				 var formattedDate = monthValue+'/'+dateValue+'/'+$scope.qcStartDate.getFullYear()
				 return formattedDate;
			 }else if("scheduleTime"==model){
				  
				 return $scope.mytime;
			 }	
			 else if("endDate"==model)
			 {
				 var monthValue = $scope.qcEndDate.getMonth()+1;
				 if(monthValue <=9){
					 monthValue = '0'+monthValue;
				 }
				 var dateValue = $scope.qcEndDate.getDate();
				 if(dateValue <=9){
					 dateValue = '0'+dateValue;
				 }
				 var formattedDate = monthValue+'/'+dateValue+'/'+$scope.qcEndDate.getFullYear()
				 return formattedDate;
			 }
			 else if("cluster"==model)
			 {
				return $scope.qcClustermodel;
			 }
			 else if("api"==model)
			 {
				return $scope.apiNameModel;
			  }else if("version"==model)
				  
			  {
					return $scope.versionModel;
			  }else if("client"==model)
			  {
				 
				 return $scope.clientModel;
			  }
		 };
					 
		/* email  click function */		 
		 $rootScope.emailLink= function()
			{
			 
			 	
				var params = 'app='+$location.path().replace("/","")
				
		 	
				 params = params + '&startDate=' + $rootScope.getQcCodeCoverageFilterModel("startDate");
				 params = params + '&endDate=' + $rootScope.getQcCodeCoverageFilterModel("endDate");
				 params = params + '&cluster=' + $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("cluster"));
				 params = params + '&api=' + $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("api"));
				 params = params + '&version='+ $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("version"));
				 params = params + '&client=' + $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("client"));
				
				var protocol = $location.protocol();
				var host = $location.host();
				var port = $location.port();
				var path = "qc_coverage_report";
				
				var url = protocol+"://"+host+":"+port+"/api360-ui/#/"+path+"?"+escape(params);
						
				var link = "mailto:"+ $rootScope.loginuser
		        + "?subject=API360 Email as link"		
		        + "&body="+url;
				
				//window.prompt("Copy to clipboard: Ctrl+C, Enter", url);		
				window.location.href = link;
			};
			
			$scope.scheduleReportStartDate = $rootScope.getQcCodeCoverageFilterModel("sheduleRepotStartDate");//"5/10/2015";
			$scope.scheduleReportEndDate = $rootScope.getQcCodeCoverageFilterModel("sheduleRepotEndDate");//"5/10/2015";
			 
			
			$scope.$watch("StartDate",function(newValue,oldValue){
				$scope.scheduleReportStartDate = $rootScope.getQcCodeCoverageFilterModel("sheduleRepotStartDate");
			});
			
			$scope.$watch("EndDate",function(newValue,oldValue){
				$scope.scheduleReportEndDate = $rootScope.getQcCodeCoverageFilterModel("sheduleRepotEndDate");
			});
			
			 
};