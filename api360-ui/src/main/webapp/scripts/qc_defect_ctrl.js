'use strict'


function DefectReportCtrl($scope,$rootScope, $resource, $http, $location,$timeout,defectReportService){
	
	
	$scope.gridHeaderMessages="Defect Report";
	$rootScope.batchJobStatus =   $rootScope.getBatchJobDetail("almqcMigrateTaskLetJob",true);	
	$scope.batchJobStatusDetail=$rootScope.batchJobStatus.lastUpdated;
	
	
    $scope.defectShowHideFilter = true;
	
	$scope.defectShowHide= function()
	{
		if($scope.defectShowHideFilter)
		{
			$( "#defectFilterId" ).fadeOut( "slow");
		}
		else
		{
			$( "#defectFilterId" ).fadeIn( "slow");
		}
		
		$timeout(function() {
	    	$( $.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();		        
	    }, 1000);
		
	};
	
	
	$rootScope.renderGrid = function()
	{
		defectReportService.renderDefectReportGrid($scope,$rootScope,$http,$location);
		$rootScope.submitDefectReportDefaultSearch();
	};	
	
	
	$rootScope.submitDefectReportDefaultSearch = function()
	 {
	//api360-service/qc-defect/report.json?defectid=All&defectstatus=All&asstoapp=All&asstoteam=All&pmt=All&release=All
	
		var url = '/api360-service/qc-defect/report.json?';
		   
		var params =null;
		
		if($rootScope.urlparams!=undefined)
		{
		
			
			params = 
			 'defectstatus=' + $rootScope.urlparams.DefectStatus+ 			 
			 '&asstoapp=' + $rootScope.urlparams.AssignedToAPP+
			 '&asstoteam=' + $rootScope.urlparams.AssignedToTeam+
			 '&pmt=' + $rootScope.urlparams.PMT+
			 '&release=' + $rootScope.urlparams.Release+
			 '&fromDate=' + $rootScope.urlparams.fromDate+
			 '&toDate=' + $rootScope.urlparams.toDate +
			 '&severity=' + $rootScope.urlparams.Severity +
			 '&pid=' + $rootScope.urlparams.PID;
			
			
			
		}
		else
		{
			
			
			
			
			  params =  
			 'defectstatus=' + $scope.getCommaSeparatedStringStatus($rootScope.getDefectReportGlobalFilterModel("DefectStatus")) + 
			 '&asstoapp=' + $scope.getCommaSeparatedString($rootScope.getDefectReportGlobalFilterModel("AssignedToAPP"))+
			 '&asstoteam=' + $scope.getCommaSeparatedString($rootScope.getDefectReportGlobalFilterModel("AssignedToTeam"))+
			 '&pmt=' + $scope.getCommaSeparatedString($rootScope.getDefectReportGlobalFilterModel("PMT"))+
			 '&release=' + $scope.getCommaSeparatedString($rootScope.getDefectReportGlobalFilterModel("Release"))+
			 '&fromDate=' + $scope.formatedDate($rootScope.getDefectReportGlobalFilterModel("fromDate"),"fromDate")+
			 '&toDate=' + $scope.formatedDate($rootScope.getDefectReportGlobalFilterModel("toDate"),"toDate")+
			 '&severity=' + $scope.getCommaSeparatedStringSeverity($rootScope.getDefectReportGlobalFilterModel("Severity"))+
			 '&pid=' + $scope.getCommaSeparatedString($rootScope.getDefectReportGlobalFilterModel("PID"));
			
		}	
		
	
		$rootScope.launch('wait');	
		
		$rootScope.defectreporttable.ajax.url(url+params).load($scope.searchGridCallback);	
	};
	 
	
	$rootScope.submitDefectSearch = function()
	{
		var url = '/api360-service/qc-defect/report.json?';
		   
		var params =null;
		
		if($rootScope.urlparams!=undefined)
		{
			params = 'defectstatus=' + $rootScope.urlparams.DefectStatus+ 			 
				 '&asstoapp=' + $rootScope.urlparams.AssignedToAPP+
				 '&asstoteam=' + $rootScope.urlparams.AssignedToTeam+
				 '&pmt=' + $rootScope.urlparams.PMT+
				 '&release=' + $rootScope.urlparams.Release+
				 '&fromDate=' + $rootScope.urlparams.fromDate+
				 '&toDate=' + $rootScope.urlparams.toDate+
				 '&severity=' + $rootScope.urlparams.Severity+
				 '&pid=' + $rootScope.urlparams.PID;
			
			
		}
		else
		{
			  params = 'defectstatus=' + $scope.getCommaSeparatedString($rootScope.getDefectReportFilterModel("DefectStatus")) + 
			 '&asstoapp=' + $scope.getCommaSeparatedString($rootScope.getDefectReportFilterModel("AssignedToAPP"))+
			 '&asstoteam=' + $scope.getCommaSeparatedString($rootScope.getDefectReportFilterModel("AssignedToTeam"))+
			 '&pmt=' + $scope.getCommaSeparatedString($rootScope.getDefectReportFilterModel("PMT"))+
			 '&release=' + $scope.getCommaSeparatedString($rootScope.getDefectReportFilterModel("Release"))+
			 '&fromDate=' + $scope.formatedDate($rootScope.getDefectReportFilterModel("fromDate"),"fromDate")+
			 '&toDate=' + $scope.formatedDate($rootScope.getDefectReportFilterModel("toDate"),"toDate")+
			 '&severity=' + $scope.getCommaSeparatedString($rootScope.getDefectReportFilterModel("Severity"))+
			 '&pid=' + $scope.getCommaSeparatedString($rootScope.getDefectReportFilterModel("PID"));
			  
			  
			 
		}	
		
		
		
		$rootScope.launch('wait');	
		
		$rootScope.defectreporttable.ajax.url(url+params).load($scope.searchGridCallback);	
	};
	
	
	$scope.searchGridCallback = function ()
	{
		$rootScope.$broadcast('dialogs.wait.complete');
		
		$('#defectGridID tbody tr td').each( function() 
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
	
	
	
	$scope.getCommaSeparatedStringStatus = function(json) 
	{ 
		
		console.log("default search"+json);
		
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
		
		console.log("default search"+json);
		
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
	
	
	$scope.getCommaSeparatedStringStatusLength = function(json) 
	{ 
		
		
		
		
		
		if(json.length==0 )
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
			return "All";
		}
			
		
		
		return result.replace(/,(\s+)?$/, '');
		
		
	};
	
	
	
	
	
	
	
	
	$('#defectGridID tbody').on( 'click', 'tr', function () 
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
	
	
	$rootScope.formatExtraInfo= function(desc,release){
		var summary="";
		var comments="";
		   if(desc !=""){
			    summary=desc.split("{=}")[0];
			    comments=desc.split("{=}")[1];
		   }
		  return '<div class="row"><div class="col-md-1"><strong>Release:</strong></div><div class="col-md-11 desc">'+release.release+'</div></div><br><div class="row"><div class="col-md-1"><strong>Summary:</strong></div><div class="col-md-11 desc">'+summary+'</div><div class="col-md-1"><strong>Comments:</strong></div><div class="col-md-11"><code><strong>'+comments.trim()+'</strong></code></div></div>';
		
	};
	
	
	
	$scope.formatedDate=function(dateStr,which){
		var result="";
		
		
		if(dateStr==undefined || dateStr==null)
		{
			if("fromDate" ==which ){
				var fromdate= new Date();
				return  fromdate.getDate()+"/"+(fromdate.getMonth()-1)+"/"+fromdate.getFullYear() ;
			}else if("toDate" == which){
				var todate= new Date();
				 return  todate.getDate()+"/"+(todate.getMonth())+"/"+todate.getFullYear() ;
			}
			
		}
		
	
		result= dateStr.getDate()+"/"+(dateStr.getMonth()+1)+"/"+dateStr.getFullYear() ;
		
		return result ;
	};
	
	
	
	
}