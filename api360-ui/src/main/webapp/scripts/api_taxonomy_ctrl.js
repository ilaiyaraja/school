'use strict';

/*CREATED DATE :2/12/2015
CREATEDBY :Abhimanyu

*/
function APITaxonmyCtrl($scope,$rootScope, $resource,$http,$timeout, $interval, $location,apitaxonomyService) 
{

	$scope.gridHeaderMessages="API Taxonomy Results";
	
	$rootScope.globleData=[];
	//$rootScope.batchJobStatus =   $rootScope.getBatchJobDetail("apiTaxonomyTaskLetJob",true);	
	//$scope.batchJobStatusDetail=$rootScope.batchJobStatus.lastUpdated;
	
	
	$rootScope.apiTaxonomytable=null;
	
   $scope.apiTaxonomayShowHideFilter = true;
	
	$scope.apiTaxonomayShowHide= function()
	{
		if($scope.apiTaxonomayShowHideFilter)
		{
			$( "#apiTaxonomyFilterId" ).fadeOut( "slow");
		}
		else
		{
			$( "#apiTaxonomyFilterId" ).fadeIn( "slow");
		}
		
	};
	
	$rootScope.renderAPITaxonomyGrid = function()
	{
		
		$rootScope.submitAPITaxonomyDefaultSearch();
		
		
		
	};	
	
	/*
	 * encodeURIComponent
	 * @RequestParam(value="funlevel1") String funlevel1,
			@RequestParam(value="funlevel2") String funlevel2,
			@RequestParam(value="funlevel3") String funlevel3,
			@RequestParam(value="funlevel4") String funlevel4
	 * 
	 */
	
	$rootScope.submitAPITaxonomyDefaultSearch = function()
	{
		var url = '/api360-service/api-taxonomy/report.json?';
		   
		var params =null;
		
		if($rootScope.urlparams!=undefined)
		{
			params = 
			 'bundle=' + $rootScope.urlparams.Bundles+
			 '&application=' + $rootScope.urlparams.APIs+ 			 
			 '&domain=' + $rootScope.urlparams.Domains+
			 '&businesstrack=' + $rootScope.urlparams.BusinessTracks+
			 '&businessname=' + $rootScope.urlparams.BusinessNames+
			 '&lbgups=' + $rootScope.urlparams.LBGUPS+
			 '&funlevel1=' + encodeURIComponent($rootScope.urlparams.FunctionalModelLevel1)+
			 '&funlevel2=' + encodeURIComponent($rootScope.urlparams.FunctionalModelLevel2)+
			 '&funlevel3=' + encodeURIComponent($rootScope.urlparams.FunctionalModelLevel3)+
			 '&funlevel4=' + encodeURIComponent($rootScope.urlparams.FunctionalModelLevel4);
			
			
			 
		}
		else
		{
			 
			  
			  params = 
					 'bundle=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("Bundles"))+
					 '&application=' +$scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("APIs"))+ 			 
					 '&domain=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("Domains"))+
					 '&businesstrack=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("BusinessTracks"))+
					 '&businessname=' +$scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("BusinessNames"))+
					 '&lbgups=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("LBGUPS"))+
					 '&funlevel1=' + encodeURIComponent($scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("FunctionalModelLevel1")))+
					 '&funlevel2=' + encodeURIComponent($scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("FunctionalModelLevel2")))+
					 '&funlevel3=' + encodeURIComponent($scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("FunctionalModelLevel3")))+
					 '&funlevel4=' + encodeURIComponent($scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("FunctionalModelLevel4")));
			        
			  
			  
			  
			  
		}	
		
		$rootScope.launch('wait');		
		$rootScope.renderedDynamicGrid(url+params);
	};
	 
	
	$rootScope.submitAPITaxonomySearch = function()
	{
		var url = '/api360-service/api-taxonomy/report.json?';
		   
		var params =null;
		
		if($rootScope.urlparams!=undefined)
		{
			params = 
				 'bundle=' + $rootScope.urlparams.Bundles+
				 '&application=' + $rootScope.urlparams.APIs+ 			 
				 '&domain=' + $rootScope.urlparams.Domains+
				 '&businesstrack=' + $rootScope.urlparams.BusinessTracks+
				 '&businessname=' + $rootScope.urlparams.BusinessNames+
				 '&lbgups=' + $rootScope.urlparams.LBGUPS+
				 '&funlevel1=' + encodeURIComponent($rootScope.urlparams.FunctionalModelLevel1)+
				 '&funlevel2=' + encodeURIComponent($rootScope.urlparams.FunctionalModelLevel2)+
				 '&funlevel3=' + encodeURIComponent($rootScope.urlparams.FunctionalModelLevel3)+
				 '&funlevel4=' + encodeURIComponent($rootScope.urlparams.FunctionalModelLevel4);
		}
		else
		{
			 
			  
			  params = 
					 'bundle=' +$scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("Bundles"))+
					 '&application=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("APIs"))+ 			 
					 '&domain=' +$scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("Domains"))+
					 '&businesstrack=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("BusinessTracks"))+
					 '&businessname=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("BusinessNames"))+
					 '&lbgups=' + $scope.getCommaSeparatedString($rootScope.getAPITaxonomyFilterModel("LBGUPS"))+
					 '&funlevel1=' + encodeURIComponent($scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("FunctionalModelLevel1")))+
					 '&funlevel2=' + encodeURIComponent($scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("FunctionalModelLevel2")))+
					 '&funlevel3=' + encodeURIComponent($scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("FunctionalModelLevel3")))+
					 '&funlevel4=' + encodeURIComponent($scope.getCommaSeparatedString($rootScope.getAPITaxonomyGlobalFilterModel("FunctionalModelLevel4")));
			  
			  
			  
		}	
		
		$rootScope.launch('wait');	
		$rootScope.renderedDynamicGrid(url+params);
	
		
	};
	
	
	$scope.searchGridCallback = function ()
	{
		$rootScope.$broadcast('dialogs.wait.complete');
		
		$('#apitaxonomygrid tbody tr td').each( function() 
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
	
	
	
	
	
	
	
   $rootScope.renderedDynamicGrid= function(url){
	   
	   var loadFilters = $http.get(url);	 
		 $http.dataType="json";
		 loadFilters.then(function(payload) 
	     {
			 
			
			
			 $rootScope.globleData = payload.data.aaData ;
			
			 
			 var functional_model_column_count=payload.data.totalfunctionmodelcount;
			 
		
			 
			/* //alter json data to match functional model columns 
			 angular.forEach($rootScope.globleData,function(value,index){				 
				 var functionalModelPathArray  =value.functionalModelPath;				 
				 value.Functional_Model_Level_0=functionalModelPathArray[0];
				  for(var j=1;j<functional_model_column_count;j++){
					  eval("value.Functional_Model_Level_"+j+"=functionalModelPathArray["+j+"];");
				  }				  
	          });*/
			 			
			 
			 
			 //Map datatable columns with json props
			 $rootScope.aryJSONColTable=[ { 
				    "className":      'details-control', 
		            "orderable":      false, 
		            "data":           null, 
		            "defaultContent": '<span class="glyphicon glyphicon-chevron-right"></span>'	 
			 },{"sTitle":"API","data":"name"},{"sTitle":"Domain","data":"domain"},{"sTitle":"LBGUPS","data":"lbgups"},{"sTitle":"BusinessTrack","data":"businessTrack"}];		 
		
			 for (var i=0; i <  functional_model_column_count; i++ ) {				 
				 $rootScope.aryJSONColTable.push({
					 "sTitle":"FunctionalModel(Level"+parseInt(i+1)+")",
					 "data":"funlevel"+parseInt(i+1)
				 });
			 };
			 
			
			
			
			 apitaxonomyService.renderAPITaxonomyGrid($scope,$rootScope,$timeout);
			 $scope.searchGridCallback();
			 apitaxonomyService.expandGridCallback($scope,$rootScope);
			 $rootScope.rowSelection();
			 
	     });
	   
	   
	   
   };
	
	
   $rootScope.rowSelection = function() 
	{
		
	   
	   $('#apitaxonomygrid tbody').on( 'click', 'tr', function () 
			    {
					
					//var position =  $('#apitaxonomygrid').fnGetPosition(this); // getting the clicked row position
					//var contactId =  $('#apitaxonomygrid').fnGetData(position); // getting the value of the first (invisible) column
					//console.log(contactId.account_Type);
					
					if ( $(this).hasClass('selected') ) 
			        {
			            $(this).removeClass('selected');
			        }
			        else 
			        {
			            $('tr.selected').removeClass('selected');
			            $(this).addClass('selected');
			        }
			    } );
	   
	   
	   
	};
	
	
	
	$rootScope.formatExtraInfo = function  ( d ) {
	    return '<div class="row"><div class="col-md-2"><strong>Business Name :</strong></div><div class="col-md-10">'+d.businessName+'</div></div>'+
        '<div class="row"><div class="col-md-1"><strong>Description:</strong></div><div class="col-md-11">'+d.description+'</div></div>';
            
	};
	
	
	
	
	
	
}
