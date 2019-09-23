'use strict';


function FederatedQcCoverageCtrl($scope,$rootScope, $resource, $http,dialogs,$modal, $location,federatedQcCoverageService) 
{
	
	$scope.gridHeaderMessages="QC Coverage Report";
	
		$rootScope.renderGrid = function()
		{
			federatedQcCoverageService.rederQcCodeCoverageGrid($scope,$http,$rootScope);
			
			if($rootScope.urlparams != undefined){
				$rootScope.loadQcCodeCoverageComboBox()
			}
			/* $rootScope.submitFederatedCodeCoverageDefaultSearch(); Don't want to display data in datatable */
			 
		};	
		
		
		
		
		$scope.execDashboardShowHideFilter = false;
		
		$scope.execDashboardShowHide= function()
		{
			if($scope.execDashboardShowHideFilter)
			{
				$( "#modelLeftContainer" ).fadeOut( "slow");
				$("#modelright").addClass("col-md-12");
				$scope.execDashboardShowHideFilter = false;
			}
			else
			{
				$( "#modelLeftContainer" ).fadeIn( "slow");
				$("#modelright").removeClass("col-md-12");
				$scope.execDashboardShowHideFilter = true;
			}
			
		};
	
/*	admin-service/report/usage.json?userId=&reportId=9&startDate=04/10/2015&endDate=04/10/2015&invalidDaysCount=120
			&start=0&limit=100&methodId=66
*/
	
		
		/*default
		submitfunction*/
		
		
	$rootScope.submitFederatedCodeCoverageDefaultSearch = function()
	{
		 var url = '/api360-service/federatedQCCoverage/report.json?';
	       
	    var params =null;
	    var versionParameters = ['88'];
		var apiParameters = ['All'];
	 	
	    if($rootScope.urlparams!=undefined)
	    {
		     params = 
		      'startDate=' + $rootScope.urlparams.startDate+
		      '&endDate=' + $rootScope.urlparams.endDate+     
		      '&cluster=' + $rootScope.urlparams.cluster+
		      '&api=' + $rootScope.urlparams.api+
		      '&version=' + $rootScope.urlparams.version+
		      '&client=' + $rootScope.urlparams.client;
	    }
	    else
	    {
	    	
	    	var currentDate= new Date();
			var currentDateValue=  (currentDate.getMonth()+1)+"/"+currentDate.getDate()+"/"+currentDate.getFullYear() ;
		       params = 'startDate='+currentDateValue+// + $scope.getQcCodeCoverageFilterModel("startDate") + 
		      '&endDate='+currentDateValue+ //+ $scope.getQcCodeCoverageFilterModel("endDate") + 
		      '&cluster=All'+// + $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("cluster"))+
		      '&api=' +apiParameters+
		      //All'+// + $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("api"))+
		      '&version=' +versionParameters+
		      '&client=All'// + $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("client"));
	    } 
	    
	    $rootScope.launch('wait');  
	    $rootScope.qcCodeCoverageTable.api().ajax.url(url+params).load($scope.searchGridCallback);	
	};
  
	 
	$rootScope.realTimeQcCoverageReport = function(){
		var url = 'http://hltd425.hydc.sbc.com:8181/admin-service/batch/executefederated/callback.json?jobName=federatedBatchJob';
			 
		var params =null;
		if($rootScope.getQcCodeCoverageFilterModel("api")[0].id == "All" || $rootScope.getQcCodeCoverageFilterModel("version")[0].id == "All"){
		 	$rootScope.launch('custom3');
		}else{
			//alert("You are about to fetch real time QC coverage report.This may take sometime!!!.");
			//$rootScope.launch('custom4');
			
			var dlg = dialogs.confirm('Please Confirm','You are about to fetch real time federated coverage report.This may take sometime!!!.');
			dlg.result.then(function(btn){
				$scope.confirmed = 'You confirmed "Yes."';
					 params =  
					  '&processmodelid=' +$scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("api"))+
					  '&version=' +$scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("version"))+
					  '&callback=success';
					 
//success({"success":"true"})	  
					 
					 $rootScope.launch('wait');  
					 var loadRealTimeReport = $http.get(url+params);
					 $http.dataType="json";
					/* loadRealTimeReport.success(function(data){ 
						  $rootScope.$broadcast('dialogs.wait.complete');
						  $rootScope.launch('custom5');
					
					  });*/
					 loadRealTimeReport.success(function(data){
						 $rootScope.$broadcast('dialogs.wait.complete');
						  $rootScope.launch('custom5');
					 }).error(function(data){
						 $rootScope.$broadcast('dialogs.wait.complete');
						  $rootScope.launch('custom5');
						 
					 });
					 
					      
				},function(btn){
					$scope.confirmed = 'You confirmed "No."';
				});
			 
		}
		
 	};
 	
 	$rootScope.scheduleReportSubmit = function(){
		 
 		var url = 'http://hltd425.hydc.sbc.com:8202/scheduler-service/scheduler/jobs/createDaily.json?';
 		//var url = '/scheduler-service/scheduler/jobs/createDaily.json?';
		if($rootScope.getQcCodeCoverageFilterModel("frequency") == "Monthly"){
			url = 'http://hltd425.hydc.sbc.com:8202/scheduler-service/scheduler/jobs/createMonthly.json?';
		}else if( $rootScope.getQcCodeCoverageFilterModel("frequency") == "Weekly"){
		 	url = 'http://hltd425.hydc.sbc.com:8202/scheduler-service/scheduler/jobs/createWeekly.json?';
		}
		
		//alert(url);
		var params =null
	 
	 
		
		 	var dlg = dialogs.confirm('Please Confirm','You are about to schedule "QC coverage report A PDF report will be generated  and will be emailed to '+$rootScope.loginemailid+'".');
			dlg.result.then(function(btn){
				$scope.confirmed = 'You confirmed "Yes."';
					 params = 'p_QC_sd=' + $scope.getQcCodeCoverageFilterModel("startDate") +
					  '&p_QC_ed=' + $scope.getQcCodeCoverageFilterModel("endDate") + 
				      '&p_cluster=' + $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("cluster"))+
				      '&p_interface=' + $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("api"))+
				      '&p_version=' +$scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("version"))+
				      '&p_client=' + $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("client")) +
				      
					  '&sch_start_date=' +$rootScope.getQcCodeCoverageFilterModel("sheduleRepotStartDate")+
					  '&sch_time=' +$rootScope.getQcCodeCoverageFilterModel("scheduleTime")+
					  '&sch_end_date=' + $rootScope.getQcCodeCoverageFilterModel("sheduleRepotEndDate")+
					  '&print_option=' + $rootScope.getQcCodeCoverageFilterModel("pdf")+
					  '&sch_mode=' + $rootScope.getQcCodeCoverageFilterModel("frequency")+''
					  
					   if($rootScope.getQcCodeCoverageFilterModel("frequency") == "Monthly"){
						   params+= '&sch_month=' +$rootScope.getQcCodeCoverageFilterModel("month")+''
						}else if( $rootScope.getQcCodeCoverageFilterModel("frequency") == "Weekly"){
							params+= '&sch_week=' + $rootScope.getQcCodeCoverageFilterModel("week")+''
						}
					 params+= '&user=' + $rootScope.attuid.split(",")[0] +'&email=' + $rootScope.loginemailid+'&sch_timezone=-18000'+'&sch_year=2015'+'&sch_reportname=Federated_QC_Coverage';
					  
					 
			 		 
					  //alert(url+params);
					 $rootScope.launch('wait');  
					var loadRealTimeReport = $http.get(url+params);
					$http.dataType="json";
					 
					 loadRealTimeReport.success(function(data){
						 $rootScope.$broadcast('dialogs.wait.complete');
						  $rootScope.launch('custom7');
					 }).error(function(data){
						 $rootScope.$broadcast('dialogs.wait.complete');
						  $rootScope.launch('custom7');
						 
					 });
					 
					      
				},function(btn){
					$scope.confirmed = 'You confirmed "No."';
				});
			 
		 
		
 	};
 	
 	
 	
	
	  $rootScope.submitQcCodeCoverageSearch = function(){
		   
		    var url = '/api360-service/federatedQCCoverage/report.json?';
			       
			    var params =null;
			    var versionParameters = $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("version"));
			    versionParameters = versionParameters.replace("All",0)
			    
			    if($rootScope.urlparams!=undefined)
			    {
			     params = 
			    	 'startDate=' + $rootScope.urlparams.startDate+
				      '&endDate=' + $rootScope.urlparams.endDate+     
				      '&cluster=' + $rootScope.urlparams.cluster+
				      '&api=' + $rootScope.urlparams.api+
				      '&version=' + $rootScope.urlparams.version+
				      '&client=' + $rootScope.urlparams.client;
			    }
			    else
			    {
			       params = 'startDate=' + $scope.getQcCodeCoverageFilterModel("startDate") + 
			      '&endDate=' + $scope.getQcCodeCoverageFilterModel("endDate") + 
			      '&cluster=' + $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("cluster"))+
			      '&api=' + $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("api"))+
			      '&version=' +versionParameters+
			      '&client=' + $scope.getCommaSeparatedString($rootScope.getQcCodeCoverageFilterModel("client"));
			    } 
			    
			    $rootScope.launch('wait');  
			    $rootScope.qcCodeCoverageTable.api().ajax.url(url+params).load($scope.searchGridCallback);
     };
     

		
     $scope.searchGridCallback = function ()
	   	{	
	   		
	   		$rootScope.$broadcast('dialogs.wait.complete');
	   		
	   		$('#qcCodeCoverageGridID tbody tr td').each( function() 
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
		
		$rootScope.getCommaSeparatedString = function(json) 
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
		
		/*  popup changes */
		$scope.showActivitesCodedDialog = function() {
			$scope.openactivity('lg');
		};
		
		$rootScope.openactivity = function(size) {
			var modalInstance = $modal
					.open({
						templateUrl : 'partials/test_tools/activites_coded.html',
						controller : 'ModalInstanceCtrl',
						size : size,
						resolve : {
							items : function() {
								return $scope.items;
							}
						}
					});

			modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
			}, function() {
				// $log.info('Modal dismissed at: ' + new Date());
			});
		};
		
		$scope.columnDefs = [ {
			name : 'activity_Id',
			displayName : 'Activity Id',
			width : '20%',
			allowCellFocus : false,
			cellTemplate: '<div class="ui-grid-cell-contents" title="{{row.entity.activity_Id}}">{{row.entity.activity_Id}}</div>'
		}, 
		{
			name : 'activity_CD',
			displayName : 'Activity Cd',
			width : '42%',
			allowCellFocus : false,
			cellTemplate: '<div class="ui-grid-cell-contents" title="{{row.entity.activity_CD}}">{{row.entity.activity_CD}}</div>' 
		},
		{
			name : 'activity_Name',
			displayName : 'Activity Name',
			width : '125%',
			allowCellFocus : false,
			cellTemplate: '<div class="ui-grid-cell-contents" title="{{row.entity.activity_Name}}">{{row.entity.activity_Name}}</div>'
			 
		},
		{
			name : 'api_name',
			displayName : 'api_name',
			visible :false
		},

		{
			name : 'full_version',
			displayName : 'full_version',
			visible :false
		}];

		
		$rootScope.gridActivityOptions = {
			enableRowSelection : true,
			enableColumnResize : true,
			paging: true,
			pagingPageSizes: [5, 10, 10],
            pagingPageSize: 5,
            columnDefs : $scope.columnDefs
		};
		
		$rootScope.gridActivityOptions.multiSelect = false;
		$rootScope.gridActivityOptions.enableFiltering = true;
		$rootScope.gridActivityOptions.lateBoundColumns = false;
		
		


		/* to show hide left side container in modal dialog */
		$rootScope.transationTraceShowHideFilter = true;
		
		$rootScope.showHideFilterInModel = function() {
			if($rootScope.transationTraceShowHideFilter)
			{
				$( "#modelLeftContainer" ).fadeOut( "slow");
				$rootScope.transationTraceShowHideFilter = false;
			}
			else
			{
				$( "#modelLeftContainer" ).fadeIn( "slow");
				$rootScope.transationTraceShowHideFilter = true;
			}
			
		};
		$rootScope.modelApiName = "";
		$rootScope.modelVersion = "";
		$rootScope.modelHeading = "";
		$rootScope.modelClient = "";
		$rootScope.modelStartDate = "";
		$rootScope.modelEndDate = "";
		$rootScope.modelCluster = "";
		
		$rootScope.showFlag = false;
		
		
		$scope.iframeLoadedCallBack = function() {
			federatedQcCoverageService.iframeLoadedCallBack($scope, $rootScope);
		};
		
		/* grid activity  onchange callback */
		$scope.gridActivityOptions.onRegisterApi = function(gridApi) {
			// set gridApi on scope
			$scope.gridApi = gridApi;

			gridApi.selection.on.rowSelectionChanged($scope, function(row) 
			{
				/*$scope.selected_version=null;
				transactionTraceService.fnOne($scope, $rootScope, $http, $interval,row, 'grid');
				$scope.mySelectedRows = row;*/
				 
				//var iframeUrl  = '/atw-service/sig/trace-image/interface.html?interfaceName='+ row.entity.api_name +'&version='+ row.entity.full_version +'&signature='+ row.entity.activity_CD;
				//var iframeUrl = 'http://hltd425.hydc.sbc.com:8702/atw-service/sig/trace-image/interface.html?interfaceName='+ row.entity.api_name +'&version='+ row.entity.full_version +'&signature='+ row.entity.activity_CD;
				//var iframeUrl = 'http://hltv0577.hydc.sbc.com:8080/sigView?api='+ row.entity.api_name +'&version='+ row.entity.full_version +'&signature='+ row.entity.activity_CD;
				var iframeUrl = '/sigView?api='+ row.entity.api_name +'&version='+ row.entity.full_version +'&signature='+ row.entity.activity_CD;
				
				$("#transaction_trace_iframe").attr("src",iframeUrl);
			});
		};
		
   };
   
	