//CreatDate:4/3/2015,CreatedBy :Abhimanyu
'use strict';

function DefectReportFiltersCtrl($scope,$rootScope, $resource, $http, $location,defectreportFilterService){
	
	
	if(!jQuery.isEmptyObject($location.search()))
	{
		$rootScope.urlapp = $location.search().app;		
		$rootScope.urlparams = $location.search();
	}	
	
	$rootScope.pageLoaction="";	
	
	
		
	$rootScope.emailLink= function()
	{
		var params = 'app='+$location.path().replace("/","")
		
		
		params = params +  '&DefectStatus=' + $scope.getCommaSeparatedString($rootScope.getDefectReportFilterModel("DefectStatus"));
		params = params +  '&AssignedToAPP=' + $scope.getCommaSeparatedString($rootScope.getDefectReportFilterModel("AssignedToAPP"));		
		params = params +  '&AssignedToTeam=' + $scope.getCommaSeparatedString($rootScope.getDefectReportFilterModel("AssignedToTeam"));
		params = params +  '&PMT=' + $scope.getCommaSeparatedString($rootScope.getDefectReportFilterModel("PMT"));
		params = params +  '&Release=' + $scope.getCommaSeparatedString($rootScope.getDefectReportFilterModel("Release"));
		params = params +  '&fromDate=' + $scope.formatedDate($rootScope.getDefectReportFilterModel("fromDate"));
		params = params +  '&toDate=' + $scope.formatedDate($rootScope.getDefectReportFilterModel("toDate"));
		params = params +  '&Severity=' + $scope.formatedDate($rootScope.getDefectReportFilterModel("Severity"));
		params = params +  '&pid=' + $scope.formatedDate($rootScope.getDefectReportFilterModel("PID"));
		
			
		
		var protocol = $location.protocol();
		var host = $location.host();
		var port = $location.port();
		var path = "otherwise";
		
		var url = protocol+"://"+host+":"+port+"/api360-ui/#/"+path+"?"+escape(params);
				
		var link = "mailto:"+ $rootScope.loginuser
        + "?subject=API360 Email as link"		
        + "&body="+url;
		
		//window.prompt("Copy to clipboard: Ctrl+C, Enter", url);		
		window.location.href = link;
	};
	
	
     $rootScope.loadDefectReportComboBox= function() 
	 {
    	 defectreportFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
    	 defectreportFilterService.updateScopeFiltersWithUrlParamsValues($scope,$rootScope);
    	// var url = "/api360-service/filter/lookup/"+$scope.defect+"/"+$scope.defectstatus+"/"+$scope.asstoapp+"/"+$scope.asstoteam+"/"+$scope.pmt+"/"+$scope.release+"/qc_defect_filters.json";
    	 
    	 
    	 var params =	 'defectstatus=' +$scope.defectstatus+ 			 
						 '&asstoapp=' + $scope.asstoapp+
						 '&asstoteam=' + $scope.asstoteam+
						 '&pmt=' + $scope.pmt+
						 '&release=' + $scope.release+
						 '&fromDate=' +$scope.formatedDate($scope.detectionFromDate)+
						 '&toDate=' + $scope.formatedDate($scope.detectionToDate)+
						 '&severity=' + $scope.severity+
						 '&pid=' + $scope.pid;
    	 
    	 
    	 
 
    	 
    	 var url = "/api360-service/filter/lookup/qc_defect_filters?"+params ;
    	 
    	
    	
    	  	 
    	 
    	 
    	 
   		 defectreportFilterService.loadComboBox($scope,$rootScope,$http,url,$location.path());
	 };
	 
	 
	
	 
	 $rootScope.getDefectReportFilterModel = function(model)
	 {
		 if("DefectStatus"==model)
		 {
			 return $scope.defectstatusQCReportModel;			 
		 }
		 else if("AssignedToAPP"==model)
		 {
			return $scope.defectreportasstoappModel;
		 }
		 else if("AssignedToTeam"==model)
		 {
			return $scope.defectreportasstoteamModel;
		  }else if("PMT"==model)
		  {
			 	return $scope.defectreportpmtModel;
		  }else if("Release"==model)
		  {
			 
			 return $scope.defectreportreleaseModel;
		  }else if("fromDate"==model){
			  
			  return $scope.detectionFromDate;
		  }else if("toDate"==model){
			  
			  return   $scope.detectionToDate ;
		  }else if("Severity"==model){
			  
			  return   $scope.defectreportseverityModel ;
		  }else if("PID"==model)
		  {
			 	return $scope.defectreportpidModel;
		  }
		 
		 
	 };
	 
	 
	 $rootScope.getDefectReportGlobalFilterModel = function(model)
	 {
		  if("DefectStatus"==model)
		 {
			 return $scope.defectstatusQCReportModel;
		 }
		 else if("AssignedToAPP"==model)
		 {
			return $scope.defectreportasstoappModel;
		 }
		 else if("AssignedToTeam"==model)
		 {
			return $scope.defectreportasstoteamModel;
		  }else if("PMT"==model)
			  
		  {
			 	return $scope.defectreportpmtModel;
		  }else if("Release"==model)
		  {
			 
			 return $scope.defectreportreleaseModel;
		  }else if("fromDate"==model){
			  
			  return $scope.detectionFromDate ;
		  }else if("toDate"==model){
			  
			  return  $scope.detectionToDate;
		  }else if("Severity"==model){
			  
			  return   $scope.defectreportseverityModel ;
		  }else if("PID"==model)
			  
		  {
			 	return $scope.defectreportpidModel;
		  }
		 
		 
		 
		 
		 
		
		 
		 
		 
	 };
	 
	 
	 
	 $rootScope.getDefectReportURLFilter= function(model)
	 {
		 if("DefectStatus"==model)
		 {
			 return $scope.defectstatus;			 
		 }
		 else if("AssignedToAPP"==model)
		 {
			return $scope.asstoapp;
		 }
		 else if("AssignedToTeam"==model)
		 {
			return $scope.asstoteam;
		  }else if("PMT"==model)
			  
		  {
			 	return $scope.pmt;
		  }else if("Release"==model)
		  {
			 
			 return $scope.release;
		  }else if("fromDate"==model){
			  
			  return $scope.detectionFromDate ;
		  }else if("toDate"==model){
			  
			  return  $scope.detectionToDate;
		  }else if("Severity"==model){
			  
			  return   $scope.severity ;
		  }else if("PID"==model)
			  
		  {
			 	return $scope.pid;
		  }
	 };
	 
	 
	 $rootScope.resetDefectFilters = function()
	 {
		 $rootScope.urlparams=null;
		 defectreportFilterService.updateScopeFiltersWithDefaultValues($scope,$rootScope);
		 $rootScope.resetGlobalFilterValues();
		 $scope.resetComboBox();		 
		 $rootScope.submitDefectSearch();
	 };
	 
	 $scope.resetComboBox= function() 
	 {
		// var url = "/api360-service/filter/lookup/"+$scope.defect+"/"+$scope.defectstatus+"/"+$scope.asstoapp+"/"+$scope.asstoteam+"/"+$scope.pmt+"/"+$scope.release+"/qc_defect_filters.json";
		 
		 var params =	 'defectstatus=' +$scope.defectstatus+ 			 
		 '&asstoapp=' + $scope.asstoapp+
		 '&asstoteam=' + $scope.asstoteam+
		 '&pmt=' + $scope.pmt+
		 '&release=' + $scope.release+
		 '&fromDate=' +$scope.formatedDate($scope.detectionFromDate)+
		 '&toDate=' + $scope.formatedDate($scope.detectionToDate)+
		 '&severity=' + $scope.severity+
		 '&pid=' + $scope.pid;

		 var url = "/api360-service/filter/lookup/qc_defect_filters?"+params ;
		 
         $rootScope.loadDefectReportComboBox($scope,$rootScope,$http,url,$location.path());         
	 };
	 	
	 $rootScope.ReLoadDefectReportComboBox= function(name, value) 
	 {
		 defectreportFilterService.dashboardFilterReload($scope,$rootScope,name, value); 
		// var url = "/api360-service/filter/lookup/"+$scope.defect+"/"+$scope.defectstatus+"/"+$scope.asstoapp+"/"+$scope.asstoteam+"/"+$scope.pmt+"/"+$scope.release+"/qc_defect_filters.json";
		 
		 var params =	 'defectstatus=' +$scope.defectstatus+ 			 
		 '&asstoapp=' + $scope.asstoapp+
		 '&asstoteam=' + $scope.asstoteam+
		 '&pmt=' + $scope.pmt+
		 '&release=' + $scope.release+
		 '&fromDate=' +$scope.formatedDate($scope.detectionFromDate)+
		 '&toDate=' + $scope.formatedDate($scope.detectionToDate)+
		 '&severity=' + $scope.severity+
		 '&pid=' + $scope.pid;

		 var url = "/api360-service/filter/lookup/qc_defect_filters?"+params ;
    	 defectreportFilterService.reloadComboBoxDefectReport($scope,$rootScope,$http,url,name);		
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
		
		
		$scope.getCommaSeparatedStringStatus = function(json) 
		{ 
			if(json==undefined || json==null)
			{
				return  ['Returned/Rejected',
			            'EF Delivered To SCM',
			            'Retest Failed',
			            'Assigned/Fix In Progress',
			            'Retest',
			            'Workaround',
			            'EF Installed In Test',
			            'New',
			            'Fixed',
			            'Retest Complete',
			            'Open/In Analysis',
			            'Retest Blocked',
			            'Scheduled/Delivered',
			            'Request for Retest Failed'];
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
				return  ['Returned/Rejected',
				            'EF Delivered To SCM',
				            'Retest Failed',
				            'Assigned/Fix In Progress',
				            'Retest',
				            'Workaround',
				            'EF Installed In Test',
				            'New',
				            'Fixed',
				            'Retest Complete',
				            'Open/In Analysis',
				            'Retest Blocked',
				            'Scheduled/Delivered',
				            'Request for Retest Failed'];
			}
			
			return result.replace(/,(\s+)?$/, '');
			
			
		};
		
		$scope.getCommaSeparatedStringSeverity = function(json) 
		{ 
			if(json==undefined || json==null)
			{
				return  ['Severity 1',
			            'Severity 2'];
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
				return  ['Severity 1',
				          'Severity 2'];
			}
			
			return result.replace(/,(\s+)?$/, '');
			
			
		};
		

			$scope.openDetectionFrom = function($event)
			{
				$event.preventDefault();
				$event.stopPropagation();
				$scope.detectionFromOpened = true;
			};
			
			$scope.openDetectionToDate = function($event)
			{
				$event.preventDefault();
				$event.stopPropagation();
				$scope.detectionToDateOpened = true;
			};

			


			$scope.dateOptions = 
			{
				formatYear: 'yy',
				startingDay: 1
			};

			$scope.formats = ['dd-MMMM-yyyy','MM/dd/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
			$scope.format = $scope.formats[1];

			

			$scope.change = function() {	
				
				 $rootScope.ReLoadDefectReportComboBox();
				
				
			};

			$scope.mytime = new Date();
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
			
			
			
	$scope.formatedDate=function(dateStr){
		var result="";
		
	
		result=dateStr.getDate()+"/"+(dateStr.getMonth()+1)+"/"+dateStr.getFullYear() ;
		
		return result ;
	};		
	
	
	
	
}